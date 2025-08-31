import logger from '@/config/logger';
import { Chat } from '@/models/Chat';
import { Message } from '@/models/Message';
import { User } from '@/models/User';
import jwt from 'jsonwebtoken';
import { Socket, Server as SocketIOServer } from 'socket.io';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

// Store online users
const onlineUsers = new Map<string, string>(); // userId -> socketId
const socketToUser = new Map<string, string>(); // socketId -> userId

export const setupSocketIO = (io: SocketIOServer): void => {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as { id: string };
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      socket.userId = user._id.toString();
      next();
    } catch {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', async (socket: AuthenticatedSocket) => {
    logger.info(`✅ User connected: ${socket.userId}`);

    if (!socket.userId) {
      return;
    }

    // Store user as online
    onlineUsers.set(socket.userId, socket.id);
    socketToUser.set(socket.id, socket.userId);

    // Update user's online status
    await User.findByIdAndUpdate(socket.userId, {
      isOnline: true,
      lastSeen: new Date(),
    });

    // Join user to their personal room
    socket.join(socket.userId);

    // Get user's chats and join chat rooms
    try {
      const userChats = await Chat.find({
        members: socket.userId,
      }).select('_id');

      userChats.forEach(chat => {
        socket.join(chat._id.toString());
      });

      // Emit online status to friends
      const user = await User.findById(socket.userId).populate('friends', '_id').select('friends');

      if (user?.friends) {
        user.friends.forEach(friend => {
          socket.to(friend._id.toString()).emit('user-online', {
            userId: socket.userId,
            isOnline: true,
          });
        });
      }

      // Emit updated online users list
      socket.emit('online-users', Array.from(onlineUsers.keys()));
    } catch (error) {
      logger.error('Error setting up user rooms:', error);
    } // Handle joining chat rooms
    socket.on('join-chat', (chatId: string) => {
      socket.join(chatId);
      logger.debug(`User ${socket.userId} joined chat ${chatId}`);
    });

    // Handle leaving chat rooms
    socket.on('leave-chat', (chatId: string) => {
      socket.leave(chatId);
      logger.debug(`User ${socket.userId} left chat ${chatId}`);
    });

    // Handle new messages
    socket.on(
      'new-message',
      async (data: {
        chatId: string;
        content: string;
        attachments?: Array<{ url: string; type: string; name: string }>;
      }) => {
        try {
          const { chatId, content, attachments } = data;

          // Verify user is member of the chat
          const chat = await Chat.findOne({
            _id: chatId,
            members: socket.userId,
          });

          if (!chat) {
            socket.emit('error', {
              message: 'Chat not found or access denied',
            });
            return;
          }

          // Create new message
          const message = new Message({
            sender: socket.userId,
            chat: chatId,
            content,
            attachments: attachments || [],
          });

          await message.save();
          await message.populate('sender', 'name avatar');

          // Update chat's last message
          chat.lastMessage = message._id;
          chat.lastMessageAt = new Date();
          await chat.save();

          // Emit message to all chat members
          io.to(chatId).emit('message-received', message);

          // Send push notifications to offline users (implement as needed)
          const offlineMembers = chat.members.filter(memberId => !onlineUsers.has(memberId.toString()));

          // TODO: Implement push notifications for offline members
          logger.debug('Offline members to notify:', { offlineMembers });
        } catch (error) {
          logger.error('Error handling new message:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      },
    );

    // Handle typing indicators
    socket.on('typing-start', (data: { chatId: string }) => {
      socket.to(data.chatId).emit('user-typing', {
        userId: socket.userId,
        chatId: data.chatId,
        isTyping: true,
      });
    });

    socket.on('typing-stop', (data: { chatId: string }) => {
      socket.to(data.chatId).emit('user-typing', {
        userId: socket.userId,
        chatId: data.chatId,
        isTyping: false,
      });
    });

    // Handle message read receipts
    socket.on('mark-messages-read', async (data: { chatId: string }) => {
      try {
        await Message.updateMany(
          {
            chat: data.chatId,
            sender: { $ne: socket.userId },
            readBy: { $nin: [socket.userId] },
          },
          {
            $addToSet: { readBy: socket.userId },
          },
        );

        // Notify other users that messages were read
        socket.to(data.chatId).emit('messages-read', {
          userId: socket.userId,
          chatId: data.chatId,
        });
      } catch (error) {
        logger.error('Error marking messages as read:', error);
      }
    });

    // Handle friend requests
    socket.on('friend-request-sent', (data: { recipientId: string }) => {
      socket.to(data.recipientId).emit('friend-request-received', {
        senderId: socket.userId,
      });
    });

    socket.on('friend-request-accepted', (data: { senderId: string }) => {
      socket.to(data.senderId).emit('friend-request-accepted', {
        accepterId: socket.userId,
      });
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      logger.info(`❌ User disconnected: ${socket.userId}`);

      if (!socket.userId) {
        return;
      }

      // Remove from online users
      onlineUsers.delete(socket.userId);
      socketToUser.delete(socket.id);

      // Update user's offline status
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: new Date(),
      });

      // Emit offline status to friends
      try {
        const user = await User.findById(socket.userId).populate('friends', '_id').select('friends');

        if (user?.friends) {
          user.friends.forEach(friend => {
            socket.to(friend._id.toString()).emit('user-online', {
              userId: socket.userId,
              isOnline: false,
            });
          });
        }
      } catch (error) {
        logger.error('Error updating offline status:', error);
      }
    });

    // Handle errors
    socket.on('error', (error: Error) => {
      logger.error('Socket error:', error);
    });
  });

  // Handle server errors
  io.on('error', (error: Error) => {
    logger.error('Socket.IO server error:', error);
  });
};

export { onlineUsers, socketToUser };
