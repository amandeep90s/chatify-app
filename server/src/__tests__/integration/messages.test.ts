import {
  authenticateRequest,
  cleanupTestData,
  createTestUsers,
  generateObjectId,
  request,
  validateErrorResponse,
} from '../helpers/testHelpers';

describe('Message Routes (/api/messages)', () => {
  let users: any;

  beforeEach(async () => {
    await cleanupTestData();
    users = await createTestUsers();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('POST /api/messages', () => {
    const chatId = generateObjectId();

    it('should return "Coming soon" message for text message', async () => {
      const messageData = {
        chatId: chatId.toString(),
        content: 'Hello, this is a test message!',
        messageType: 'text',
      };

      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send(messageData)
        .expect(200);

      expect(response.body.message).toBe('Send message - Coming soon');
    });

    it('should return "Coming soon" message for image message', async () => {
      const messageData = {
        chatId: chatId.toString(),
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
      };

      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send(messageData)
        .expect(200);

      expect(response.body.message).toBe('Send message - Coming soon');
    });

    it('should return "Coming soon" message for file message', async () => {
      const messageData = {
        chatId: chatId.toString(),
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
      };

      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send(messageData)
        .expect(200);

      expect(response.body.message).toBe('Send message - Coming soon');
    });

    it('should return "Coming soon" message for reply message', async () => {
      const messageData = {
        chatId: chatId.toString(),
        content: 'This is a reply',
        messageType: 'text',
        replyTo: generateObjectId().toString(),
      };

      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send(messageData)
        .expect(200);

      expect(response.body.message).toBe('Send message - Coming soon');
    });

    it('should fail without authentication', async () => {
      const messageData = {
        chatId: chatId.toString(),
        content: 'Hello!',
        messageType: 'text',
      };

      const response = await request.post('/api/messages').send(messageData).expect(401);

      validateErrorResponse(response);
    });

    it('should fail without chatId', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({ content: 'Hello!' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should fail without content', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({ chatId: chatId.toString() })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate chatId format', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({
          chatId: 'invalid-id',
          content: 'Hello!',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate messageType', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({
          chatId: chatId.toString(),
          content: 'Hello!',
          messageType: 'invalid',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate content length', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({
          chatId: chatId.toString(),
          content: 'a'.repeat(1500), // Too long
          messageType: 'text',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate replyTo format', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({
          chatId: chatId.toString(),
          content: 'Reply',
          messageType: 'text',
          replyTo: 'invalid-id',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate attachment structure', async () => {
      const response = await authenticateRequest(request.post('/api/messages'), users.user1.token)
        .send({
          chatId: chatId.toString(),
          content: 'Image',
          messageType: 'image',
          attachments: [{ invalid: 'structure' }],
        })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('GET /api/messages/chat/:chatId', () => {
    const chatId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.get(`/api/messages/chat/${chatId}`), users.user1.token).expect(
        200,
      );

      expect(response.body.message).toBe('Get chat messages - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get(`/api/messages/chat/${chatId}`).expect(401);

      validateErrorResponse(response);
    });

    it('should handle pagination parameters', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}?page=1&limit=25`),
        users.user1.token,
      ).expect(200);

      expect(response.body.message).toBe('Get chat messages - Coming soon');
    });

    it('should handle date filters', async () => {
      const before = new Date().toISOString();
      const after = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}?before=${before}&after=${after}`),
        users.user1.token,
      ).expect(200);

      expect(response.body.message).toBe('Get chat messages - Coming soon');
    });

    it('should validate chatId format', async () => {
      const response = await authenticateRequest(
        request.get('/api/messages/chat/invalid-id'),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate pagination parameters', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}?page=0&limit=0`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate limit parameter maximum', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}?limit=200`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate date format', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}?before=invalid-date`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('GET /api/messages/:messageId', () => {
    const messageId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.get(`/api/messages/${messageId}`), users.user1.token).expect(
        200,
      );

      expect(response.body.message).toBe('Get message details - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get(`/api/messages/${messageId}`).expect(401);

      validateErrorResponse(response);
    });

    it('should validate messageId format', async () => {
      const response = await authenticateRequest(request.get('/api/messages/invalid-id'), users.user1.token).expect(
        400,
      );

      validateErrorResponse(response);
    });
  });

  describe('PUT /api/messages/:messageId', () => {
    const messageId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const updateData = {
        content: 'Updated message content',
      };

      const response = await authenticateRequest(request.put(`/api/messages/${messageId}`), users.user1.token)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Edit message - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.put(`/api/messages/${messageId}`).send({ content: 'Updated content' }).expect(401);

      validateErrorResponse(response);
    });

    it('should fail without content', async () => {
      const response = await authenticateRequest(request.put(`/api/messages/${messageId}`), users.user1.token)
        .send({})
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate messageId format', async () => {
      const response = await authenticateRequest(request.put('/api/messages/invalid-id'), users.user1.token)
        .send({ content: 'Updated content' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate content length', async () => {
      const response = await authenticateRequest(request.put(`/api/messages/${messageId}`), users.user1.token)
        .send({ content: 'a'.repeat(1500) }) // Too long
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('DELETE /api/messages/:messageId', () => {
    const messageId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(
        request.delete(`/api/messages/${messageId}`),
        users.user1.token,
      ).expect(200);

      expect(response.body.message).toBe('Delete message - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.delete(`/api/messages/${messageId}`).expect(401);

      validateErrorResponse(response);
    });

    it('should validate messageId format', async () => {
      const response = await authenticateRequest(request.delete('/api/messages/invalid-id'), users.user1.token).expect(
        400,
      );

      validateErrorResponse(response);
    });
  });

  describe('POST /api/messages/chat/:chatId/mark-read', () => {
    const chatId = generateObjectId();

    it('should return "Coming soon" message for mark all', async () => {
      const response = await authenticateRequest(
        request.post(`/api/messages/chat/${chatId}/mark-read`),
        users.user1.token,
      )
        .send({ markAll: true })
        .expect(200);

      expect(response.body.message).toBe('Mark messages as read - Coming soon');
    });

    it('should return "Coming soon" message for specific messages', async () => {
      const messageIds = [generateObjectId().toString(), generateObjectId().toString()];

      const response = await authenticateRequest(
        request.post(`/api/messages/chat/${chatId}/mark-read`),
        users.user1.token,
      )
        .send({ messageIds })
        .expect(200);

      expect(response.body.message).toBe('Mark messages as read - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.post(`/api/messages/chat/${chatId}/mark-read`).send({ markAll: true }).expect(401);

      validateErrorResponse(response);
    });

    it('should validate chatId format', async () => {
      const response = await authenticateRequest(
        request.post('/api/messages/chat/invalid-id/mark-read'),
        users.user1.token,
      )
        .send({ markAll: true })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate messageIds format', async () => {
      const response = await authenticateRequest(
        request.post(`/api/messages/chat/${chatId}/mark-read`),
        users.user1.token,
      )
        .send({ messageIds: ['invalid-id'] })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('GET /api/messages/chat/:chatId/search', () => {
    const chatId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello`),
        users.user1.token,
      ).expect(200);

      expect(response.body.message).toBe('Search messages - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get(`/api/messages/chat/${chatId}/search?q=hello`).expect(401);

      validateErrorResponse(response);
    });

    it('should fail without search query', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should handle search filters', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello&messageType=text&sender=${users.user2.user._id}`),
        users.user1.token,
      ).expect(200);

      expect(response.body.message).toBe('Search messages - Coming soon');
    });

    it('should handle date filters', async () => {
      const dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const dateTo = new Date().toISOString();

      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello&dateFrom=${dateFrom}&dateTo=${dateTo}`),
        users.user1.token,
      ).expect(200);

      expect(response.body.message).toBe('Search messages - Coming soon');
    });

    it('should validate chatId format', async () => {
      const response = await authenticateRequest(
        request.get('/api/messages/chat/invalid-id/search?q=hello'),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate pagination parameters', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello&page=0&limit=0`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate messageType filter', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello&messageType=invalid`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate sender ID format', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello&sender=invalid-id`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate date format', async () => {
      const response = await authenticateRequest(
        request.get(`/api/messages/chat/${chatId}/search?q=hello&dateFrom=invalid-date`),
        users.user1.token,
      ).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/messages/:messageId/react', () => {
    const messageId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const reactionData = {
        emoji: '👍',
      };

      const response = await authenticateRequest(request.post(`/api/messages/${messageId}/react`), users.user1.token)
        .send(reactionData)
        .expect(200);

      expect(response.body.message).toBe('React to message - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.post(`/api/messages/${messageId}/react`).send({ emoji: '👍' }).expect(401);

      validateErrorResponse(response);
    });

    it('should fail without emoji', async () => {
      const response = await authenticateRequest(request.post(`/api/messages/${messageId}/react`), users.user1.token)
        .send({})
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate messageId format', async () => {
      const response = await authenticateRequest(request.post('/api/messages/invalid-id/react'), users.user1.token)
        .send({ emoji: '👍' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate emoji format', async () => {
      const response = await authenticateRequest(request.post(`/api/messages/${messageId}/react`), users.user1.token)
        .send({ emoji: 'not-an-emoji' })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('DELETE /api/messages/:messageId/react', () => {
    const messageId = generateObjectId();

    it('should return "Coming soon" message', async () => {
      const reactionData = {
        emoji: '👍',
      };

      const response = await authenticateRequest(request.delete(`/api/messages/${messageId}/react`), users.user1.token)
        .send(reactionData)
        .expect(200);

      expect(response.body.message).toBe('Remove reaction from message - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.delete(`/api/messages/${messageId}/react`).send({ emoji: '👍' }).expect(401);

      validateErrorResponse(response);
    });

    it('should fail without emoji', async () => {
      const response = await authenticateRequest(request.delete(`/api/messages/${messageId}/react`), users.user1.token)
        .send({})
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate messageId format', async () => {
      const response = await authenticateRequest(request.delete('/api/messages/invalid-id/react'), users.user1.token)
        .send({ emoji: '👍' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate emoji format', async () => {
      const response = await authenticateRequest(request.delete(`/api/messages/${messageId}/react`), users.user1.token)
        .send({ emoji: 'not-an-emoji' })
        .expect(400);

      validateErrorResponse(response);
    });
  });
});
