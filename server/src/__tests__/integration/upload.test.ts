import {
  authenticateRequest,
  cleanupTestData,
  createTestUsers,
  generateObjectId,
  request,
  validateErrorResponse,
} from '../helpers/testHelpers';

describe('Upload Routes (/api/upload)', () => {
  let users: any;

  beforeEach(async () => {
    await cleanupTestData();
    users = await createTestUsers();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('POST /api/upload/file', () => {
    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .field('description', 'Test file upload')
        .field('chatId', generateObjectId().toString())
        .attach('file', Buffer.from('test file content'), 'test.txt')
        .expect(200);

      expect(response.body.message).toBe('Upload single file - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .post('/api/upload/file')
        .attach('file', Buffer.from('test file content'), 'test.txt')
        .expect(401);

      validateErrorResponse(response);
    });

    it('should handle file upload without chatId', async () => {
      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .field('description', 'Test file upload')
        .attach('file', Buffer.from('test file content'), 'test.txt')
        .expect(200);

      expect(response.body.message).toBe('Upload single file - Coming soon');
    });

    it('should validate chatId format when provided', async () => {
      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .field('chatId', 'invalid-id')
        .attach('file', Buffer.from('test file content'), 'test.txt')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should fail without file', async () => {
      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .field('description', 'Test without file')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate description length', async () => {
      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .field('description', 'a'.repeat(1000)) // Too long
        .attach('file', Buffer.from('test file content'), 'test.txt')
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/upload/files', () => {
    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.post('/api/upload/files'), users.user1.token)
        .field('description', 'Multiple files upload')
        .field('chatId', generateObjectId().toString())
        .attach('files', Buffer.from('test file 1'), 'test1.txt')
        .attach('files', Buffer.from('test file 2'), 'test2.txt')
        .expect(200);

      expect(response.body.message).toBe('Upload multiple files - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .post('/api/upload/files')
        .attach('files', Buffer.from('test file 1'), 'test1.txt')
        .expect(401);

      validateErrorResponse(response);
    });

    it('should handle files upload without chatId', async () => {
      const response = await authenticateRequest(request.post('/api/upload/files'), users.user1.token)
        .field('description', 'Multiple files without chat')
        .attach('files', Buffer.from('test file 1'), 'test1.txt')
        .attach('files', Buffer.from('test file 2'), 'test2.txt')
        .expect(200);

      expect(response.body.message).toBe('Upload multiple files - Coming soon');
    });

    it('should validate chatId format when provided', async () => {
      const response = await authenticateRequest(request.post('/api/upload/files'), users.user1.token)
        .field('chatId', 'invalid-id')
        .attach('files', Buffer.from('test file 1'), 'test1.txt')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should fail without files', async () => {
      const response = await authenticateRequest(request.post('/api/upload/files'), users.user1.token)
        .field('description', 'Test without files')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate maximum number of files', async () => {
      let uploadRequest = authenticateRequest(request.post('/api/upload/files'), users.user1.token).field(
        'description',
        'Too many files',
      );

      // Attach 6 files (max is 5)
      for (let i = 1; i <= 6; i++) {
        uploadRequest = uploadRequest.attach('files', Buffer.from(`test file ${i}`), `test${i}.txt`);
      }

      const response = await uploadRequest.expect(400);
      validateErrorResponse(response);
    });

    it('should validate description length', async () => {
      const response = await authenticateRequest(request.post('/api/upload/files'), users.user1.token)
        .field('description', 'a'.repeat(1000)) // Too long
        .attach('files', Buffer.from('test file 1'), 'test1.txt')
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/upload/avatar', () => {
    it('should return "Coming soon" message for user avatar', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'user')
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(200);

      expect(response.body.message).toBe('Upload avatar - Coming soon');
    });

    it('should return "Coming soon" message for chat avatar', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'chat')
        .field('chatId', generateObjectId().toString())
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(200);

      expect(response.body.message).toBe('Upload avatar - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .post('/api/upload/avatar')
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(401);

      validateErrorResponse(response);
    });

    it('should fail without avatar file', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'user')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate type parameter', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'invalid')
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should require chatId when type is chat', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'chat')
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate chatId format when type is chat', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'chat')
        .field('chatId', 'invalid-id')
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should default to user type when not specified', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .attach('avatar', Buffer.from('fake image data'), 'avatar.jpg')
        .expect(200);

      expect(response.body.message).toBe('Upload avatar - Coming soon');
    });

    it('should validate file size limits', async () => {
      // Create a buffer larger than 5MB (simulated)
      const largeBuffer = Buffer.alloc(6 * 1024 * 1024); // 6MB

      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'user')
        .attach('avatar', largeBuffer, 'large-avatar.jpg')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate image file types', async () => {
      const response = await authenticateRequest(request.post('/api/upload/avatar'), users.user1.token)
        .field('type', 'user')
        .attach('avatar', Buffer.from('not an image'), 'avatar.txt')
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('DELETE /api/upload/file', () => {
    const fileId = generateObjectId();

    it('should return "Coming soon" message with fileId', async () => {
      const deleteData = {
        fileId: fileId.toString(),
        reason: 'No longer needed',
      };

      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send(deleteData)
        .expect(200);

      expect(response.body.message).toBe('Delete file - Coming soon');
    });

    it('should return "Coming soon" message with publicId', async () => {
      const deleteData = {
        publicId: 'files/test-file-id',
        reason: 'Duplicate file',
      };

      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send(deleteData)
        .expect(200);

      expect(response.body.message).toBe('Delete file - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.delete('/api/upload/file').send({ fileId: fileId.toString() }).expect(401);

      validateErrorResponse(response);
    });

    it('should fail without fileId or publicId', async () => {
      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send({ reason: 'Test deletion' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate fileId format', async () => {
      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send({ fileId: 'invalid-id' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate publicId format', async () => {
      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send({ publicId: '' }) // Empty publicId
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate reason length', async () => {
      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send({
          fileId: fileId.toString(),
          reason: 'a'.repeat(1000), // Too long
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should not require reason field', async () => {
      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send({ fileId: fileId.toString() })
        .expect(200);

      expect(response.body.message).toBe('Delete file - Coming soon');
    });

    it('should prevent providing both fileId and publicId', async () => {
      const response = await authenticateRequest(request.delete('/api/upload/file'), users.user1.token)
        .send({
          fileId: fileId.toString(),
          publicId: 'files/test-file-id',
        })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  // Test file upload size limits
  describe('File Size Validation', () => {
    it('should handle payload too large error', async () => {
      // This would be handled by express middleware in real scenario
      const largeBuffer = Buffer.alloc(15 * 1024 * 1024); // 15MB

      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .attach('file', largeBuffer, 'large-file.zip')
        .expect(413);

      validateErrorResponse(response);
    });
  });

  // Test file type validation
  describe('File Type Validation', () => {
    it('should validate allowed file types for general upload', async () => {
      const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
        .attach('file', Buffer.from('executable content'), 'malicious.exe')
        .expect(400);

      validateErrorResponse(response);
    });

    it('should allow common file types', async () => {
      const allowedTypes = ['document.pdf', 'image.jpg', 'video.mp4', 'audio.mp3', 'text.txt'];

      for (const filename of allowedTypes) {
        const response = await authenticateRequest(request.post('/api/upload/file'), users.user1.token)
          .attach('file', Buffer.from('test content'), filename)
          .expect(200);

        expect(response.body.message).toBe('Upload single file - Coming soon');
      }
    });
  });

  // Test upload rate limiting
  describe('Upload Rate Limiting', () => {
    it('should handle multiple rapid uploads', async () => {
      const uploadPromises: Promise<any>[] = [];

      for (let i = 0; i < 5; i++) {
        const uploadPromise = authenticateRequest(request.post('/api/upload/file'), users.user1.token).attach(
          'file',
          Buffer.from(`test content ${i}`),
          `test${i}.txt`,
        );

        uploadPromises.push(uploadPromise);
      }

      const responses = await Promise.all(uploadPromises);

      // All should succeed in test environment
      responses.forEach((response: any) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Upload single file - Coming soon');
      });
    });
  });
});
