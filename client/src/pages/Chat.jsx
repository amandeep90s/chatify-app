import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';

import { ChatWindow } from '@/components/chat';
import { sampleCurrentChat, sampleMessages } from '@/constants/sampleData';

// Styled components
const ChatPageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
}));

// Mock current user ID
const CURRENT_USER_ID = '2';

function ChatPage() {
  const [messages, setMessages] = useState(sampleMessages);
  const [currentChat] = useState(sampleCurrentChat);
  const [loading, setLoading] = useState(false);

  // Handle sending new message
  const handleSendMessage = useCallback(async (content) => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newMessage = {
        _id: Date.now().toString(),
        sender: {
          _id: CURRENT_USER_ID,
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        content,
        attachments: [],
        readBy: [],
        createdAt: new Date().toISOString(),
        isOwn: true,
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle file attachment
  const handleAttachFile = useCallback(async (files) => {
    setLoading(true);

    try {
      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (const file of files) {
        const attachmentMessage = {
          _id: Date.now().toString() + Math.random(),
          sender: {
            _id: CURRENT_USER_ID,
            name: 'You',
            avatar: 'https://i.pravatar.cc/150?img=2',
          },
          content: `Shared ${file.name}`,
          attachments: [
            {
              url: URL.createObjectURL(file),
              type: file.type.startsWith('image/')
                ? 'image'
                : file.type.startsWith('video/')
                  ? 'video'
                  : file.type.startsWith('audio/')
                    ? 'audio'
                    : 'document',
              name: file.name,
              size: file.size,
            },
          ],
          readBy: [],
          createdAt: new Date().toISOString(),
          isOwn: true,
        };

        setMessages((prev) => [...prev, attachmentMessage]);
      }
    } catch (error) {
      console.error('Failed to upload files:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle various chat actions
  const handleChatAction = useCallback((action, data) => {
    switch (action) {
      case 'call':
        console.log('Starting voice call with:', data.name);
        break;
      case 'videoCall':
        console.log('Starting video call with:', data.name);
        break;
      case 'search':
        console.log('Opening chat search for:', data.name);
        break;
      case 'info':
        console.log('Opening chat info for:', data.name);
        break;
      case 'delete':
        console.log('Deleting chat with:', data.name);
        break;
      case 'block':
        console.log('Blocking user:', data.name);
        break;
      case 'mute':
        console.log('Toggling mute for chat with:', data.name);
        break;
      case 'emoji':
        console.log('Opening emoji picker...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  }, []);

  return (
    <ChatPageContainer>
      <ChatWindow
        chat={currentChat}
        messages={messages}
        currentUserId={CURRENT_USER_ID}
        onSendMessage={handleSendMessage}
        onAttachFile={handleAttachFile}
        onChatAction={handleChatAction}
        loading={loading}
        placeholder="Type a message..."
      />
    </ChatPageContainer>
  );
}

export default ChatPage;
