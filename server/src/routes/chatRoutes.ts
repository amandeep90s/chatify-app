import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  addMembersSchema,
  createChatSchema,
  deleteChatSchema,
  getChatSchema,
  getUserChatsSchema,
  leaveChatSchema,
  makeAdminSchema,
  removeAdminSchema,
  removeMemberSchema,
  updateChatSchema,
} from '@/validation/schemas';
import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management operations
 */

// All chat routes require authentication
router.use(protect);

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
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
 *               - participants
 *             properties:
 *               name:
 *                 type: string
 *                 description: Chat name (required for group chats)
 *                 example: Project Team Chat
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs to include in the chat
 *                 example: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
 *               isGroupChat:
 *                 type: boolean
 *                 description: Whether this is a group chat
 *                 example: true
 *               avatar:
 *                 type: string
 *                 description: Group chat avatar URL
 *                 example: https://example.com/group-avatar.jpg
 *     responses:
 *       201:
 *         description: Chat created successfully
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
 *                     chat:
 *                       $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Invalid request data
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
 */
router.post('/', validate(createChatSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Create chat - Coming soon' });
});

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Get user's chats
 *     tags: [Chats]
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
 *           default: 20
 *         description: Number of chats per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, direct, group]
 *           default: all
 *         description: Filter by chat type
 *     responses:
 *       200:
 *         description: Chats retrieved successfully
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
 *                         $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', validate(getUserChatsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get user chats - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}:
 *   get:
 *     summary: Get chat details by ID
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: Chat details retrieved successfully
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
 *                     chat:
 *                       $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Not a member of this chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:chatId', validate(getChatSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get chat details - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}:
 *   put:
 *     summary: Update chat details
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Chat name
 *                 example: Updated Project Team
 *               avatar:
 *                 type: string
 *                 description: Chat avatar URL
 *                 example: https://example.com/new-avatar.jpg
 *               description:
 *                 type: string
 *                 description: Chat description
 *                 example: Updated chat description
 *     responses:
 *       200:
 *         description: Chat updated successfully
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
 *                     chat:
 *                       $ref: '#/components/schemas/Chat'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Only admins can update group chats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:chatId', validate(updateChatSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Update chat - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}:
 *   delete:
 *     summary: Delete chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: Chat deleted successfully
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
 *       403:
 *         description: Access denied - Only admins can delete group chats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:chatId', validate(deleteChatSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Delete chat - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}/members:
 *   post:
 *     summary: Add members to chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userIds
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs to add to the chat
 *                 example: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cc"]
 *     responses:
 *       200:
 *         description: Members added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request or users already in chat
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
 *         description: Access denied - Only admins can add members to group chats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:chatId/members', validate(addMembersSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Add members to chat - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}/members/{memberId}:
 *   delete:
 *     summary: Remove member from chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Member's user ID
 *         example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Member removed successfully
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
 *       403:
 *         description: Access denied - Only admins can remove members
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat or member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:chatId/members/:memberId', validate(removeMemberSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Remove member from chat - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}/leave:
 *   post:
 *     summary: Leave chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: Left chat successfully
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
 *         description: Chat not found or user not a member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:chatId/leave', validate(leaveChatSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Leave chat - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}/admins/{memberId}:
 *   post:
 *     summary: Make user admin
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Member's user ID to make admin
 *         example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: User made admin successfully
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
 *       403:
 *         description: Access denied - Only existing admins can promote members
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat or member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:chatId/admins/:memberId', validate(makeAdminSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Make user admin - Coming soon' });
});

/**
 * @swagger
 * /api/chats/{chatId}/admins/{memberId}:
 *   delete:
 *     summary: Remove admin privileges
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *         example: 60d0fe4f5311236168a109cb
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin's user ID to remove privileges
 *         example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: Admin privileges removed successfully
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
 *       403:
 *         description: Access denied - Only existing admins can remove admin privileges
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat or admin not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:chatId/admins/:memberId', validate(removeAdminSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Remove admin privileges - Coming soon' });
});

export default router;
