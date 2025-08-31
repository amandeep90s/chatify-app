import { app } from '@/index';
import { Chat } from '@/models/Chat';
import { Message } from '@/models/Message';
import { User } from '@/models/User';
import mongoose from 'mongoose';
import supertest from 'supertest';

export const request = supertest(app);

// Test user data
export const testUsers = {
  user1: {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    bio: 'Test user 1',
  },
  user2: {
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    password: 'password123',
    bio: 'Test user 2',
  },
  admin: {
    name: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'adminpass123',
    bio: 'System administrator',
    role: 'admin',
  },
};

// Test chat data
export const testChats = {
  directChat: {
    isGroupChat: false,
    members: [] as mongoose.Types.ObjectId[],
  },
  groupChat: {
    name: 'Test Group',
    description: 'A test group chat',
    isGroupChat: true,
    members: [] as mongoose.Types.ObjectId[],
  },
};

// Test message data
export const testMessages = {
  textMessage: {
    content: 'Hello, this is a test message!',
    messageType: 'text',
  },
  imageMessage: {
    content: 'Check out this image',
    messageType: 'image',
    attachments: [
      {
        url: 'https://example.com/image.jpg',
        type: 'image',
        name: 'test-image.jpg',
        size: 1024,
      },
    ],
  },
  fileMessage: {
    content: 'Here is a document',
    messageType: 'file',
    attachments: [
      {
        url: 'https://example.com/document.pdf',
        type: 'document',
        name: 'test-document.pdf',
        size: 2048,
      },
    ],
  },
};

// Helper to create a test user and return both user and token
export const createTestUser = async (userData: any) => {
  try {
    // Add a random number to make usernames unique (only letters and digits allowed)
    const randomSuffix = Math.floor(Math.random() * 100000);
    const uniqueUserData = {
      ...userData,
      username: `${userData.username}${randomSuffix}`,
      email: userData.email ? `${randomSuffix}${userData.email}` : undefined,
    };
    
    const user = await User.create(uniqueUserData);
    const token = user.generateAuthToken();
    return { user, token };
  } catch (error) {
    console.error('Failed to create test user:', error);
    throw error;
  }
};

// Helper to create multiple test users
export const createTestUsers = async () => {
  const { user: user1, token: token1 } = await createTestUser(testUsers.user1);
  const { user: user2, token: token2 } = await createTestUser(testUsers.user2);
  const { user: admin, token: adminToken } = await createTestUser(testUsers.admin);

  return {
    user1: { user: user1, token: token1 },
    user2: { user: user2, token: token2 },
    admin: { user: admin, token: adminToken },
  };
};

// Helper to create a test chat
export const createTestChat = async (chatData: any) => {
  const chat = await Chat.create(chatData);
  return chat;
};

// Helper to create a test message
export const createTestMessage = async (messageData: any) => {
  const message = await Message.create(messageData);
  return message;
};

// Helper to authenticate requests
export const authenticateRequest = (req: any, token: string) => {
  return req.set('Authorization', `Bearer ${token}`).set('Cookie', [`token=${token}`]);
};

// Helper to clean up test data
export const cleanupTestData = async () => {
  try {
    // Clear all collections
    const collections = mongoose.connection.collections;
    const deletePromises = Object.values(collections).map(collection => 
      collection.deleteMany({})
    );
    await Promise.all(deletePromises);
    
    // Also explicitly delete from models
    await Promise.all([
      User.deleteMany({}), 
      Chat.deleteMany({}), 
      Message.deleteMany({})
    ]);
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
};

// Helper to validate response structure
export const validateSuccessResponse = (response: any, expectedData?: any) => {
  expect(response.body).toHaveProperty('success', true);
  if (expectedData) {
    expect(response.body).toHaveProperty('data');
    Object.keys(expectedData).forEach(key => {
      expect(response.body.data).toHaveProperty(key);
    });
  }
};

export const validateErrorResponse = (response: any, expectedMessage?: string) => {
  expect(response.body).toHaveProperty('success', false);
  
  // Handle both error formats: single error object or errors array
  if (response.body.errors) {
    // New validation format with errors array
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    if (expectedMessage) {
      const hasExpectedMessage = response.body.errors.some((err: any) => 
        err.message?.includes(expectedMessage)
      );
      expect(hasExpectedMessage).toBe(true);
    }
  } else {
    // Legacy error format with single error object
    expect(response.body).toHaveProperty('error');
    if (expectedMessage) {
      expect(response.body.error.message).toContain(expectedMessage);
    }
  }
};

// Helper to validate pagination response
export const validatePaginatedResponse = (response: any) => {
  expect(response.body).toHaveProperty('success', true);
  expect(response.body).toHaveProperty('data');
  expect(response.body).toHaveProperty('pagination');
  expect(response.body.pagination).toHaveProperty('page');
  expect(response.body.pagination).toHaveProperty('limit');
  expect(response.body.pagination).toHaveProperty('total');
  expect(response.body.pagination).toHaveProperty('pages');
};

// Helper to generate random user data
export const generateRandomUser = () => {
  const randomId = Math.random().toString(36).substring(7);
  return {
    name: `Test User ${randomId}`,
    username: `user${randomId}`,
    email: `user${randomId}@example.com`,
    password: 'password123',
    bio: `Bio for test user ${randomId}`,
  };
};

// Helper to generate ObjectId
export const generateObjectId = () => new mongoose.Types.ObjectId();

// Helper to wait for a specified time
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to validate user object structure
export const validateUserObject = (user: any) => {
  expect(user).toHaveProperty('_id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('username');
  expect(user).toHaveProperty('bio');
  expect(user).toHaveProperty('role');
  expect(user).toHaveProperty('isOnline');
  expect(user).toHaveProperty('lastSeen');
  expect(user).toHaveProperty('friends');
  expect(user).toHaveProperty('isVerified');
  expect(user).toHaveProperty('createdAt');
  expect(user).toHaveProperty('updatedAt');
  // Should not contain password
  expect(user).not.toHaveProperty('password');
};

// Helper to validate chat object structure
export const validateChatObject = (chat: any) => {
  expect(chat).toHaveProperty('_id');
  expect(chat).toHaveProperty('isGroupChat');
  expect(chat).toHaveProperty('members');
  expect(chat).toHaveProperty('admins');
  expect(chat).toHaveProperty('lastMessageAt');
  expect(chat).toHaveProperty('createdBy');
  expect(chat).toHaveProperty('createdAt');
  expect(chat).toHaveProperty('updatedAt');
};

// Helper to validate message object structure
export const validateMessageObject = (message: any) => {
  expect(message).toHaveProperty('_id');
  expect(message).toHaveProperty('sender');
  expect(message).toHaveProperty('chat');
  expect(message).toHaveProperty('messageType');
  expect(message).toHaveProperty('readBy');
  expect(message).toHaveProperty('isDeleted');
  expect(message).toHaveProperty('createdAt');
  expect(message).toHaveProperty('updatedAt');
};
