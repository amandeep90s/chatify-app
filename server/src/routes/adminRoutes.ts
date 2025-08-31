import { adminOnly, protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  banUserSchema,
  deleteUserSchema,
  getAdminUserSchema,
  getAllUsersSchema,
  getChatReportsSchema,
  getSystemStatsSchema,
  resolveChatReportSchema,
  unbanUserSchema,
  updateUserRoleSchema,
  verifyUserSchema,
} from '@/validation/schemas';
import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative operations (Admin access required)
 */

// All admin routes require authentication and admin privileges
router.use(protect);
router.use(adminOnly);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of users per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by username, email, or name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [user, admin]
 *         description: Filter by user role
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, banned, pending]
 *         description: Filter by user status
 *       - in: query
 *         name: verified
 *         schema:
 *           type: boolean
 *         description: Filter by verification status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, lastSeen, name, email]
 *           default: createdAt
 *         description: Sort users by field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/User'
 *                           - type: object
 *                             properties:
 *                               status:
 *                                 type: string
 *                                 enum: [active, banned, pending]
 *                                 description: User account status
 *                               bannedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 description: Ban timestamp if banned
 *                               banReason:
 *                                 type: string
 *                                 description: Reason for ban if banned
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/users', validate(getAllUsersSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get all users (admin) - Coming soon' });
});

/**
 * @swagger
 * /api/admin/users/{userId}:
 *   get:
 *     summary: Get user details (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       allOf:
 *                         - $ref: '#/components/schemas/User'
 *                         - type: object
 *                           properties:
 *                             status:
 *                               type: string
 *                               enum: [active, banned, pending]
 *                               description: User account status
 *                             bannedAt:
 *                               type: string
 *                               format: date-time
 *                               description: Ban timestamp if banned
 *                             banReason:
 *                               type: string
 *                               description: Reason for ban if banned
 *                             loginHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   timestamp:
 *                                     type: string
 *                                     format: date-time
 *                                   ipAddress:
 *                                     type: string
 *                                   userAgent:
 *                                     type: string
 *                               description: Recent login history
 *                             chatCount:
 *                               type: number
 *                               description: Number of chats user is part of
 *                             messageCount:
 *                               type: number
 *                               description: Total messages sent by user
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/users/:userId', validate(getAdminUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get user details (admin) - Coming soon' });
});

/**
 * @swagger
 * /api/admin/users/{userId}/role:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: New role for the user
 *                 example: admin
 *               reason:
 *                 type: string
 *                 description: Reason for role change
 *                 example: Promoted to admin for excellent contribution
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role or cannot change own role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/users/:userId/role', validate(updateUserRoleSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Update user role - Coming soon' });
});

/**
 * @swagger
 * /api/admin/users/{userId}/ban:
 *   post:
 *     summary: Ban user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for banning the user
 *                 example: Violation of community guidelines
 *               duration:
 *                 type: number
 *                 description: Ban duration in days (null for permanent ban)
 *                 example: 7
 *               permanent:
 *                 type: boolean
 *                 description: Whether this is a permanent ban
 *                 default: false
 *                 example: false
 *     responses:
 *       200:
 *         description: User banned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request or user already banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required or cannot ban admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/users/:userId/ban', validate(banUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Ban user - Coming soon' });
});

/**
 * @swagger
 * /api/admin/users/{userId}/ban:
 *   delete:
 *     summary: Unban user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for unbanning the user
 *                 example: Appeal accepted, false positive ban
 *     responses:
 *       200:
 *         description: User unbanned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: User is not banned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/users/:userId/ban', validate(unbanUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Unban user - Coming soon' });
});

/**
 * @swagger
 * /api/admin/users/{userId}:
 *   delete:
 *     summary: Delete user account (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for deleting the account
 *                 example: GDPR compliance request
 *               hardDelete:
 *                 type: boolean
 *                 description: Whether to permanently delete all data
 *                 default: false
 *                 example: false
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Cannot delete admin account or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/users/:userId', validate(deleteUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Delete user account - Coming soon' });
});

/**
 * @swagger
 * /api/admin/users/{userId}/verify:
 *   post:
 *     summary: Verify user account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verified:
 *                 type: boolean
 *                 description: Verification status
 *                 default: true
 *                 example: true
 *               reason:
 *                 type: string
 *                 description: Reason for verification status change
 *                 example: Identity verified through manual review
 *     responses:
 *       200:
 *         description: User verification status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/users/:userId/verify', validate(verifyUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Verify user account - Coming soon' });
});

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get system statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [24h, 7d, 30d, 90d, 1y]
 *           default: 30d
 *         description: Time period for statistics
 *       - in: query
 *         name: timezone
 *         schema:
 *           type: string
 *           default: UTC
 *         description: Timezone for date calculations
 *         example: America/New_York
 *     responses:
 *       200:
 *         description: System statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 1250
 *                         active:
 *                           type: number
 *                           example: 980
 *                         newRegistrations:
 *                           type: number
 *                           example: 45
 *                         banned:
 *                           type: number
 *                           example: 12
 *                         verified:
 *                           type: number
 *                           example: 890
 *                     chats:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 3420
 *                         groupChats:
 *                           type: number
 *                           example: 892
 *                         directChats:
 *                           type: number
 *                           example: 2528
 *                         newChats:
 *                           type: number
 *                           example: 67
 *                     messages:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 87543
 *                         newMessages:
 *                           type: number
 *                           example: 2340
 *                         messageTypes:
 *                           type: object
 *                           properties:
 *                             text:
 *                               type: number
 *                               example: 75430
 *                             image:
 *                               type: number
 *                               example: 8923
 *                             file:
 *                               type: number
 *                               example: 2341
 *                             audio:
 *                               type: number
 *                               example: 743
 *                             video:
 *                               type: number
 *                               example: 106
 *                     system:
 *                       type: object
 *                       properties:
 *                         uptime:
 *                           type: string
 *                           example: 15d 6h 32m
 *                         serverLoad:
 *                           type: object
 *                           properties:
 *                             cpu:
 *                               type: number
 *                               example: 23.5
 *                             memory:
 *                               type: number
 *                               example: 67.8
 *                         storageUsed:
 *                           type: number
 *                           description: Storage used in GB
 *                           example: 12.7
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/stats', validate(getSystemStatsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get system statistics - Coming soon' });
});

/**
 * @swagger
 * /api/admin/reports:
 *   get:
 *     summary: Get chat reports for moderation
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of reports per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, resolved, dismissed]
 *         description: Filter by report status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [spam, harassment, inappropriate, abuse, other]
 *         description: Filter by report type
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high, critical]
 *         description: Filter by priority level
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, priority, type]
 *           default: createdAt
 *         description: Sort reports by field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Chat reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109cd
 *                           type:
 *                             type: string
 *                             enum: [spam, harassment, inappropriate, abuse, other]
 *                             example: harassment
 *                           description:
 *                             type: string
 *                             example: User sending inappropriate messages
 *                           priority:
 *                             type: string
 *                             enum: [low, medium, high, critical]
 *                             example: high
 *                           status:
 *                             type: string
 *                             enum: [pending, resolved, dismissed]
 *                             example: pending
 *                           reporter:
 *                             $ref: '#/components/schemas/User'
 *                           reportedUser:
 *                             $ref: '#/components/schemas/User'
 *                           reportedChat:
 *                             $ref: '#/components/schemas/Chat'
 *                           reportedMessage:
 *                             $ref: '#/components/schemas/Message'
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-12-01T10:30:00Z
 *                           resolvedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-12-01T11:30:00Z
 *                           resolvedBy:
 *                             $ref: '#/components/schemas/User'
 *                           resolution:
 *                             type: string
 *                             example: User has been warned and message deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/reports', validate(getChatReportsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get chat reports - Coming soon' });
});

/**
 * @swagger
 * /api/admin/reports/{reportId}:
 *   put:
 *     summary: Resolve chat report
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: Report ID
 *         example: 60d0fe4f5311236168a109cd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - resolution
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [resolved, dismissed]
 *                 description: Resolution status
 *                 example: resolved
 *               resolution:
 *                 type: string
 *                 description: Resolution description
 *                 example: User has been warned and inappropriate message deleted
 *               action:
 *                 type: string
 *                 enum: [none, warning, temporary_ban, permanent_ban, message_delete]
 *                 description: Action taken
 *                 example: warning
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *                 example: First offense, warning issued
 *     responses:
 *       200:
 *         description: Report resolved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid status or resolution
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Admin privileges required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Report not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/reports/:reportId', validate(resolveChatReportSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Resolve chat report - Coming soon' });
});

export default router;
