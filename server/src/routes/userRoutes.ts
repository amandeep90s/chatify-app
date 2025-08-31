import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  blockUserSchema,
  cancelFriendRequestSchema,
  getFriendRequestsSchema,
  getFriendsSchema,
  getUserSchema,
  removeFriendSchema,
  respondToFriendRequestSchema,
  searchUsersSchema,
  sendFriendRequestSchema,
  unblockUserSchema,
  updateOnlineStatusSchema,
  updateUserSettingsSchema,
} from '@/validation/schemas';
import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and social features
 */

// All user routes require authentication
router.use(protect);

/**
 * @swagger
 * /api/users/profile/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Users]
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
 *         description: User profile retrieved successfully
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/profile/:userId', validate(getUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get user profile - Coming soon' });
});

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query (username, name, or email)
 *         example: john
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
 *           maximum: 50
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Users found
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
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/search', validate(searchUsersSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Search users - Coming soon' });
});

/**
 * @swagger
 * /api/users/friend-request:
 *   post:
 *     summary: Send friend request
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to send friend request to
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Friend request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request or friend request already exists
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/friend-request', validate(sendFriendRequestSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Send friend request - Coming soon' });
});

/**
 * @swagger
 * /api/users/friend-request/{requestId}:
 *   put:
 *     summary: Respond to friend request
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend request ID
 *         example: 60d0fe4f5311236168a109cb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [accept, reject]
 *                 description: Action to take on the friend request
 *                 example: accept
 *     responses:
 *       200:
 *         description: Friend request responded to successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid action or request
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
 *       404:
 *         description: Friend request not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/friend-request/:requestId', validate(respondToFriendRequestSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Respond to friend request - Coming soon' });
});

/**
 * @swagger
 * /api/users/friend-request/{userId}:
 *   delete:
 *     summary: Cancel friend request
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to cancel friend request to
 *         example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Friend request cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Friend request not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/friend-request/:userId', validate(cancelFriendRequestSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Cancel friend request - Coming soon' });
});

/**
 * @swagger
 * /api/users/friend/{friendId}:
 *   delete:
 *     summary: Remove friend
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend's user ID
 *         example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Friend removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Friend not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/friend/:friendId', validate(removeFriendSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Remove friend - Coming soon' });
});

/**
 * @swagger
 * /api/users/friends:
 *   get:
 *     summary: Get friends list
 *     tags: [Users]
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
 *           maximum: 50
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: online
 *         schema:
 *           type: boolean
 *         description: Filter by online status
 *     responses:
 *       200:
 *         description: Friends list retrieved successfully
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
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/friends', validate(getFriendsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get friends list - Coming soon' });
});

/**
 * @swagger
 * /api/users/friend-requests:
 *   get:
 *     summary: Get friend requests
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [sent, received, all]
 *           default: all
 *         description: Type of friend requests to retrieve
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
 *           maximum: 50
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Friend requests retrieved successfully
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
 *                             example: 60d0fe4f5311236168a109cc
 *                           from:
 *                             $ref: '#/components/schemas/User'
 *                           to:
 *                             $ref: '#/components/schemas/User'
 *                           status:
 *                             type: string
 *                             enum: [pending, accepted, rejected]
 *                             example: pending
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-12-01T10:30:00Z
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/friend-requests', validate(getFriendRequestsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get friend requests - Coming soon' });
});

/**
 * @swagger
 * /api/users/block:
 *   post:
 *     summary: Block user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to block
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request or user already blocked
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/block', validate(blockUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Block user - Coming soon' });
});

/**
 * @swagger
 * /api/users/unblock:
 *   post:
 *     summary: Unblock user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to unblock
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request or user not blocked
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/unblock', validate(unblockUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Unblock user - Coming soon' });
});

/**
 * @swagger
 * /api/users/online-status:
 *   put:
 *     summary: Update online status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isOnline
 *             properties:
 *               isOnline:
 *                 type: boolean
 *                 description: Online status
 *                 example: true
 *     responses:
 *       200:
 *         description: Online status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/online-status', validate(updateOnlineStatusSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Update online status - Coming soon' });
});

/**
 * @swagger
 * /api/users/settings:
 *   put:
 *     summary: Update user settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notifications:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: boolean
 *                     description: Email notifications enabled
 *                     example: true
 *                   push:
 *                     type: boolean
 *                     description: Push notifications enabled
 *                     example: true
 *                   sound:
 *                     type: boolean
 *                     description: Sound notifications enabled
 *                     example: false
 *               privacy:
 *                 type: object
 *                 properties:
 *                   showOnlineStatus:
 *                     type: boolean
 *                     description: Show online status to friends
 *                     example: true
 *                   showLastSeen:
 *                     type: boolean
 *                     description: Show last seen to friends
 *                     example: false
 *               theme:
 *                 type: string
 *                 enum: [light, dark, auto]
 *                 description: UI theme preference
 *                 example: dark
 *               language:
 *                 type: string
 *                 description: Preferred language
 *                 example: en
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/settings', validate(updateUserSettingsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Update user settings - Coming soon' });
});

export default router;
