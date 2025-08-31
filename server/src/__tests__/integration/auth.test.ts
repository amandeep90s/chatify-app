import {
  authenticateRequest,
  cleanupTestData,
  createTestUser,
  request,
  testUsers,
  validateErrorResponse,
  validateSuccessResponse,
  validateUserObject,
} from '../helpers/testHelpers';

describe('Auth Routes (/api/auth)', () => {
  // Clean up before and after tests
  beforeEach(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request.post('/api/auth/register').send(testUsers.user1).expect(201);

      validateSuccessResponse(response, { user: true, token: true });
      validateUserObject(response.body.data.user);
      expect(response.body.data.user.username).toBe(testUsers.user1.username);
      expect(response.body.data.user.email).toBe(testUsers.user1.email);
      expect(response.body.data.user.name).toBe(testUsers.user1.name);

      // Check that cookies are set
      expect(response.headers['set-cookie']).toBeDefined();
      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies.some((cookie: string) => cookie.includes('token='))).toBe(true);
      expect(cookies.some((cookie: string) => cookie.includes('refreshToken='))).toBe(true);
    });

    it('should fail to register user with missing required fields', async () => {
      const invalidUser = {
        name: 'Test User',
        // missing username and password
      };

      const response = await request.post('/api/auth/register').send(invalidUser).expect(400);

      validateErrorResponse(response);
    });

    it('should fail to register user with existing username', async () => {
      // Create first user
      await createTestUser(testUsers.user1);

      // Try to register with same username
      const response = await request.post('/api/auth/register').send(testUsers.user1).expect(400);

      validateErrorResponse(response, 'User already exists');
    });

    it('should fail to register user with existing email', async () => {
      // Create first user
      await createTestUser(testUsers.user1);

      // Try to register with same email
      const duplicateEmailUser = {
        ...testUsers.user2,
        email: testUsers.user1.email,
      };

      const response = await request.post('/api/auth/register').send(duplicateEmailUser).expect(400);

      validateErrorResponse(response, 'User already exists');
    });

    it('should register user without email', async () => {
      const userWithoutEmail = {
        name: 'No Email User',
        username: 'noemail',
        password: 'password123',
        bio: 'User without email',
      };

      const response = await request.post('/api/auth/register').send(userWithoutEmail).expect(201);

      validateSuccessResponse(response, { user: true, token: true });
      expect(response.body.data.user.email).toBeUndefined();
    });

    it('should fail with invalid password (too short)', async () => {
      const userWithShortPassword = {
        ...testUsers.user1,
        password: '123',
      };

      const response = await request.post('/api/auth/register').send(userWithShortPassword).expect(400);

      validateErrorResponse(response);
    });

    it('should fail with invalid username format', async () => {
      const userWithInvalidUsername = {
        ...testUsers.user1,
        username: 'invalid-username!',
      };

      const response = await request.post('/api/auth/register').send(userWithInvalidUsername).expect(400);

      validateErrorResponse(response);
    });

    it('should fail with invalid email format', async () => {
      const userWithInvalidEmail = {
        ...testUsers.user1,
        email: 'invalid-email',
      };

      const response = await request.post('/api/auth/register').send(userWithInvalidEmail).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/auth/login', () => {
    let testUser: any;

    beforeEach(async () => {
      const result = await createTestUser(testUsers.user1);
      testUser = result.user;
    });

    it('should login with valid credentials', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({
          username: testUsers.user1.username,
          password: testUsers.user1.password,
        })
        .expect(200);

      validateSuccessResponse(response, { user: true, token: true });
      validateUserObject(response.body.data.user);
      expect(response.body.data.user.username).toBe(testUsers.user1.username);

      // Check that cookies are set
      expect(response.headers['set-cookie']).toBeDefined();
      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies.some((cookie: string) => cookie.includes('token='))).toBe(true);
      expect(cookies.some((cookie: string) => cookie.includes('refreshToken='))).toBe(true);
    });

    it('should fail with invalid username', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: testUsers.user1.password,
        })
        .expect(401);

      validateErrorResponse(response, 'Invalid credentials');
    });

    it('should fail with invalid password', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({
          username: testUsers.user1.username,
          password: 'wrongpassword',
        })
        .expect(401);

      validateErrorResponse(response, 'Invalid credentials');
    });

    it('should fail with missing username', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({
          password: testUsers.user1.password,
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should fail with missing password', async () => {
      const response = await request
        .post('/api/auth/login')
        .send({
          username: testUsers.user1.username,
        })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request.post('/api/auth/logout').expect(200);

      validateSuccessResponse(response);
      expect(response.body.message).toBe('Logged out successfully');

      // Check that cookies are cleared
      expect(response.headers['set-cookie']).toBeDefined();
      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies.some((cookie: string) => cookie.includes('token=;'))).toBe(true);
      expect(cookies.some((cookie: string) => cookie.includes('refreshToken=;'))).toBe(true);
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should return not implemented error', async () => {
      const response = await request.post('/api/auth/refresh-token').send({ refreshToken: 'dummy-token' }).expect(501);

      validateErrorResponse(response, 'not implemented');
    });

    it('should fail without refresh token', async () => {
      const response = await request.post('/api/auth/refresh-token').expect(401);

      validateErrorResponse(response, 'Refresh token not provided');
    });
  });

  describe('GET /api/auth/me', () => {
    let testUser: any;
    let token: string;

    beforeEach(async () => {
      const result = await createTestUser(testUsers.user1);
      testUser = result.user;
      token = result.token;
    });

    it('should get current user profile', async () => {
      const response = await authenticateRequest(request.get('/api/auth/me'), token).expect(200);

      validateSuccessResponse(response, { user: true });
      validateUserObject(response.body.data.user);
      expect(response.body.data.user._id).toBe(testUser._id.toString());
    });

    it('should fail without authentication', async () => {
      const response = await request.get('/api/auth/me').expect(401);

      validateErrorResponse(response);
    });

    it('should fail with invalid token', async () => {
      const response = await authenticateRequest(request.get('/api/auth/me'), 'invalid-token').expect(401);

      validateErrorResponse(response);
    });
  });

  describe('PUT /api/auth/profile', () => {
    let testUser: any;
    let token: string;

    beforeEach(async () => {
      const result = await createTestUser(testUsers.user1);
      testUser = result.user;
      token = result.token;
    });

    it('should update user profile', async () => {
      const updateData = {
        name: 'Updated Name',
        bio: 'Updated bio',
        email: 'updated@example.com',
      };

      const response = await authenticateRequest(request.put('/api/auth/profile'), token).send(updateData).expect(200);

      validateSuccessResponse(response, { user: true });
      expect(response.body.data.user.name).toBe(updateData.name);
      expect(response.body.data.user.bio).toBe(updateData.bio);
      expect(response.body.data.user.email).toBe(updateData.email);
    });

    it('should fail without authentication', async () => {
      const response = await request.put('/api/auth/profile').send({ name: 'Updated Name' }).expect(401);

      validateErrorResponse(response);
    });

    it('should ignore invalid fields', async () => {
      const updateData = {
        name: 'Updated Name',
        username: 'newusername', // Should be ignored
        password: 'newpassword', // Should be ignored
        role: 'admin', // Should be ignored
      };

      const response = await authenticateRequest(request.put('/api/auth/profile'), token).send(updateData).expect(200);

      validateSuccessResponse(response, { user: true });
      expect(response.body.data.user.name).toBe(updateData.name);
      expect(response.body.data.user.username).toBe(testUsers.user1.username); // Should not change
      expect(response.body.data.user.role).toBe('user'); // Should not change
    });

    it('should validate email format', async () => {
      const updateData = {
        email: 'invalid-email-format',
      };

      const response = await authenticateRequest(request.put('/api/auth/profile'), token).send(updateData).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('PUT /api/auth/change-password', () => {
    let testUser: any;
    let token: string;

    beforeEach(async () => {
      const result = await createTestUser(testUsers.user1);
      testUser = result.user;
      token = result.token;
    });

    it('should change password successfully', async () => {
      const passwordData = {
        currentPassword: testUsers.user1.password,
        newPassword: 'newpassword123',
      };

      const response = await authenticateRequest(request.put('/api/auth/change-password'), token)
        .send(passwordData)
        .expect(200);

      validateSuccessResponse(response);
      expect(response.body.message).toBe('Password changed successfully');
    });

    it('should fail with incorrect current password', async () => {
      const passwordData = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123',
      };

      const response = await authenticateRequest(request.put('/api/auth/change-password'), token)
        .send(passwordData)
        .expect(400);

      validateErrorResponse(response, 'Current password is incorrect');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .put('/api/auth/change-password')
        .send({
          currentPassword: testUsers.user1.password,
          newPassword: 'newpassword123',
        })
        .expect(401);

      validateErrorResponse(response);
    });

    it('should fail with missing fields', async () => {
      const response = await authenticateRequest(request.put('/api/auth/change-password'), token)
        .send({ currentPassword: testUsers.user1.password })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should fail with weak new password', async () => {
      const passwordData = {
        currentPassword: testUsers.user1.password,
        newPassword: '123',
      };

      const response = await authenticateRequest(request.put('/api/auth/change-password'), token)
        .send(passwordData)
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('DELETE /api/auth/account', () => {
    let testUser: any;
    let token: string;

    beforeEach(async () => {
      const result = await createTestUser(testUsers.user1);
      testUser = result.user;
      token = result.token;
    });

    it('should delete account successfully', async () => {
      const response = await authenticateRequest(request.delete('/api/auth/account'), token).expect(200);

      validateSuccessResponse(response);
      expect(response.body.message).toBe('Account deleted successfully');

      // Check that cookies are cleared
      expect(response.headers['set-cookie']).toBeDefined();
      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies.some((cookie: string) => cookie.includes('token=;'))).toBe(true);
      expect(cookies.some((cookie: string) => cookie.includes('refreshToken=;'))).toBe(true);
    });

    it('should fail without authentication', async () => {
      const response = await request.delete('/api/auth/account').expect(401);

      validateErrorResponse(response);
    });
  });
});
