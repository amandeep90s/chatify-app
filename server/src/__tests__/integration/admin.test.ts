import {
  authenticateRequest,
  cleanupTestData,
  createTestUsers,
  generateObjectId,
  request,
  validateErrorResponse,
} from '../helpers/testHelpers';

describe('Admin Routes (/api/admin)', () => {
  let users: any;

  beforeEach(async () => {
    await cleanupTestData();
    users = await createTestUsers();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('GET /api/admin/users', () => {
    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.get('/api/admin/users'), users.admin.token).expect(200);

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get('/api/admin/users').expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(request.get('/api/admin/users'), users.user1.token).expect(403);

      validateErrorResponse(response);
    });

    it('should handle pagination parameters', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?page=1&limit=10'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should handle search parameter', async () => {
      const response = await authenticateRequest(request.get('/api/admin/users?search=john'), users.admin.token).expect(
        200,
      );

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should handle role filter', async () => {
      const response = await authenticateRequest(request.get('/api/admin/users?role=admin'), users.admin.token).expect(
        200,
      );

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should handle status filter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?status=active'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should handle verified filter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?verified=true'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should handle sorting parameters', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?sortBy=name&sortOrder=asc'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get all users (admin) - Coming soon');
    });

    it('should validate pagination parameters', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?page=0&limit=0'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate limit parameter maximum', async () => {
      const response = await authenticateRequest(request.get('/api/admin/users?limit=200'), users.admin.token).expect(
        400,
      );

      validateErrorResponse(response);
    });

    it('should validate role parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?role=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate status parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?status=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate sortBy parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?sortBy=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate sortOrder parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/users?sortOrder=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('GET /api/admin/users/:userId', () => {
    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(
        request.get(`/api/admin/users/${users.user1.user._id}`),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get user details (admin) - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get(`/api/admin/users/${users.user1.user._id}`).expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(
        request.get(`/api/admin/users/${users.user2.user._id}`),
        users.user1.token,
      ).expect(403);

      validateErrorResponse(response);
    });

    it('should validate userId format', async () => {
      const response = await authenticateRequest(request.get('/api/admin/users/invalid-id'), users.admin.token).expect(
        400,
      );

      validateErrorResponse(response);
    });
  });

  describe('PUT /api/admin/users/:userId/role', () => {
    it('should return "Coming soon" message', async () => {
      const roleData = {
        role: 'admin',
        reason: 'Promoting user to admin',
      };

      const response = await authenticateRequest(
        request.put(`/api/admin/users/${users.user1.user._id}/role`),
        users.admin.token,
      )
        .send(roleData)
        .expect(200);

      expect(response.body.message).toBe('Update user role - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .put(`/api/admin/users/${users.user1.user._id}/role`)
        .send({ role: 'admin' })
        .expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(
        request.put(`/api/admin/users/${users.user2.user._id}/role`),
        users.user1.token,
      )
        .send({ role: 'admin' })
        .expect(403);

      validateErrorResponse(response);
    });

    it('should fail without role', async () => {
      const response = await authenticateRequest(
        request.put(`/api/admin/users/${users.user1.user._id}/role`),
        users.admin.token,
      )
        .send({ reason: 'No role specified' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate role values', async () => {
      const response = await authenticateRequest(
        request.put(`/api/admin/users/${users.user1.user._id}/role`),
        users.admin.token,
      )
        .send({ role: 'invalid' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate userId format', async () => {
      const response = await authenticateRequest(request.put('/api/admin/users/invalid-id/role'), users.admin.token)
        .send({ role: 'admin' })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/admin/users/:userId/ban', () => {
    it('should return "Coming soon" message for temporary ban', async () => {
      const banData = {
        reason: 'Violation of community guidelines',
        duration: 7,
        permanent: false,
      };

      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send(banData)
        .expect(200);

      expect(response.body.message).toBe('Ban user - Coming soon');
    });

    it('should return "Coming soon" message for permanent ban', async () => {
      const banData = {
        reason: 'Serious violation',
        permanent: true,
      };

      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send(banData)
        .expect(200);

      expect(response.body.message).toBe('Ban user - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .post(`/api/admin/users/${users.user1.user._id}/ban`)
        .send({ reason: 'Test ban' })
        .expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user2.user._id}/ban`),
        users.user1.token,
      )
        .send({ reason: 'Test ban' })
        .expect(403);

      validateErrorResponse(response);
    });

    it('should fail without reason', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send({ duration: 7 })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate userId format', async () => {
      const response = await authenticateRequest(request.post('/api/admin/users/invalid-id/ban'), users.admin.token)
        .send({ reason: 'Test ban' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate duration type', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send({
          reason: 'Test ban',
          duration: 'invalid',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate permanent type', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send({
          reason: 'Test ban',
          permanent: 'invalid',
        })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('DELETE /api/admin/users/:userId/ban', () => {
    it('should return "Coming soon" message', async () => {
      const unbanData = {
        reason: 'Appeal accepted',
      };

      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send(unbanData)
        .expect(200);

      expect(response.body.message).toBe('Unban user - Coming soon');
    });

    it('should work without reason', async () => {
      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user1.user._id}/ban`),
        users.admin.token,
      )
        .send({})
        .expect(200);

      expect(response.body.message).toBe('Unban user - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.delete(`/api/admin/users/${users.user1.user._id}/ban`).expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user2.user._id}/ban`),
        users.user1.token,
      ).expect(403);

      validateErrorResponse(response);
    });

    it('should validate userId format', async () => {
      const response = await authenticateRequest(
        request.delete('/api/admin/users/invalid-id/ban'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('DELETE /api/admin/users/:userId', () => {
    it('should return "Coming soon" message for soft delete', async () => {
      const deleteData = {
        reason: 'GDPR compliance request',
        hardDelete: false,
      };

      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user1.user._id}`),
        users.admin.token,
      )
        .send(deleteData)
        .expect(200);

      expect(response.body.message).toBe('Delete user account - Coming soon');
    });

    it('should return "Coming soon" message for hard delete', async () => {
      const deleteData = {
        reason: 'Data purge request',
        hardDelete: true,
      };

      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user1.user._id}`),
        users.admin.token,
      )
        .send(deleteData)
        .expect(200);

      expect(response.body.message).toBe('Delete user account - Coming soon');
    });

    it('should work without optional fields', async () => {
      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user1.user._id}`),
        users.admin.token,
      )
        .send({})
        .expect(200);

      expect(response.body.message).toBe('Delete user account - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.delete(`/api/admin/users/${users.user1.user._id}`).expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user2.user._id}`),
        users.user1.token,
      ).expect(403);

      validateErrorResponse(response);
    });

    it('should validate userId format', async () => {
      const response = await authenticateRequest(
        request.delete('/api/admin/users/invalid-id'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate hardDelete type', async () => {
      const response = await authenticateRequest(
        request.delete(`/api/admin/users/${users.user1.user._id}`),
        users.admin.token,
      )
        .send({ hardDelete: 'invalid' })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('POST /api/admin/users/:userId/verify', () => {
    it('should return "Coming soon" message for verification', async () => {
      const verifyData = {
        verified: true,
        reason: 'Identity verified through manual review',
      };

      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/verify`),
        users.admin.token,
      )
        .send(verifyData)
        .expect(200);

      expect(response.body.message).toBe('Verify user account - Coming soon');
    });

    it('should return "Coming soon" message for unverification', async () => {
      const verifyData = {
        verified: false,
        reason: 'Verification revoked due to policy change',
      };

      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/verify`),
        users.admin.token,
      )
        .send(verifyData)
        .expect(200);

      expect(response.body.message).toBe('Verify user account - Coming soon');
    });

    it('should work without optional fields', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/verify`),
        users.admin.token,
      )
        .send({})
        .expect(200);

      expect(response.body.message).toBe('Verify user account - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .post(`/api/admin/users/${users.user1.user._id}/verify`)
        .send({ verified: true })
        .expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user2.user._id}/verify`),
        users.user1.token,
      )
        .send({ verified: true })
        .expect(403);

      validateErrorResponse(response);
    });

    it('should validate userId format', async () => {
      const response = await authenticateRequest(request.post('/api/admin/users/invalid-id/verify'), users.admin.token)
        .send({ verified: true })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate verified type', async () => {
      const response = await authenticateRequest(
        request.post(`/api/admin/users/${users.user1.user._id}/verify`),
        users.admin.token,
      )
        .send({ verified: 'invalid' })
        .expect(400);

      validateErrorResponse(response);
    });
  });

  describe('GET /api/admin/stats', () => {
    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.get('/api/admin/stats'), users.admin.token).expect(200);

      expect(response.body.message).toBe('Get system statistics - Coming soon');
    });

    it('should handle period parameter', async () => {
      const response = await authenticateRequest(request.get('/api/admin/stats?period=7d'), users.admin.token).expect(
        200,
      );

      expect(response.body.message).toBe('Get system statistics - Coming soon');
    });

    it('should handle timezone parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/stats?timezone=America/New_York'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get system statistics - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get('/api/admin/stats').expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(request.get('/api/admin/stats'), users.user1.token).expect(403);

      validateErrorResponse(response);
    });

    it('should validate period parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/stats?period=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('GET /api/admin/reports', () => {
    it('should return "Coming soon" message', async () => {
      const response = await authenticateRequest(request.get('/api/admin/reports'), users.admin.token).expect(200);

      expect(response.body.message).toBe('Get chat reports - Coming soon');
    });

    it('should handle filtering parameters', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/reports?status=pending&type=harassment&priority=high'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get chat reports - Coming soon');
    });

    it('should handle pagination and sorting', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/reports?page=1&limit=10&sortBy=priority&sortOrder=desc'),
        users.admin.token,
      ).expect(200);

      expect(response.body.message).toBe('Get chat reports - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request.get('/api/admin/reports').expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(request.get('/api/admin/reports'), users.user1.token).expect(403);

      validateErrorResponse(response);
    });

    it('should validate status parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/reports?status=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate type parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/reports?type=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate priority parameter', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/reports?priority=invalid'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });

    it('should validate pagination parameters', async () => {
      const response = await authenticateRequest(
        request.get('/api/admin/reports?page=0&limit=0'),
        users.admin.token,
      ).expect(400);

      validateErrorResponse(response);
    });
  });

  describe('PUT /api/admin/reports/:reportId', () => {
    const reportId = generateObjectId();

    it('should return "Coming soon" message for resolved', async () => {
      const resolutionData = {
        status: 'resolved',
        resolution: 'User has been warned and inappropriate message deleted',
        action: 'warning',
        notes: 'First offense, warning issued',
      };

      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.admin.token)
        .send(resolutionData)
        .expect(200);

      expect(response.body.message).toBe('Resolve chat report - Coming soon');
    });

    it('should return "Coming soon" message for dismissed', async () => {
      const resolutionData = {
        status: 'dismissed',
        resolution: 'No violation found',
        action: 'none',
        notes: 'False report',
      };

      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.admin.token)
        .send(resolutionData)
        .expect(200);

      expect(response.body.message).toBe('Resolve chat report - Coming soon');
    });

    it('should fail without authentication', async () => {
      const response = await request
        .put(`/api/admin/reports/${reportId}`)
        .send({
          status: 'resolved',
          resolution: 'Test resolution',
        })
        .expect(401);

      validateErrorResponse(response);
    });

    it('should fail with non-admin user', async () => {
      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.user1.token)
        .send({
          status: 'resolved',
          resolution: 'Test resolution',
        })
        .expect(403);

      validateErrorResponse(response);
    });

    it('should fail without status', async () => {
      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.admin.token)
        .send({ resolution: 'Test resolution' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should fail without resolution', async () => {
      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.admin.token)
        .send({ status: 'resolved' })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate status values', async () => {
      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.admin.token)
        .send({
          status: 'invalid',
          resolution: 'Test resolution',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate action values', async () => {
      const response = await authenticateRequest(request.put(`/api/admin/reports/${reportId}`), users.admin.token)
        .send({
          status: 'resolved',
          resolution: 'Test resolution',
          action: 'invalid',
        })
        .expect(400);

      validateErrorResponse(response);
    });

    it('should validate reportId format', async () => {
      const response = await authenticateRequest(request.put('/api/admin/reports/invalid-id'), users.admin.token)
        .send({
          status: 'resolved',
          resolution: 'Test resolution',
        })
        .expect(400);

      validateErrorResponse(response);
    });
  });
});
