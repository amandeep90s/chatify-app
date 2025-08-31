import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  deleteMessageSchema,
  editMessageSchema,
  getMessageSchema,
  getMessagesSchema,
  markMessagesReadSchema,
  reactToMessageSchema,
  removeReactionSchema,
  searchMessagesSchema,
  sendMessageSchema,
} from '@/validation/schemas';
import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message operations and interactions
 */

// All message routes require authentication
router.use(protect);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
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
 *               - chatId
 *               - content
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: ID of the chat to send message to
 *                 example: 60d0fe4f5311236168a109cb
 *               content:
 *                 type: string
 *                 description: Message content
 *                 example: Hello, how are you doing?
 *               messageType:
 *                 type: string
 *                 enum: [text, image, file, audio, video]
 *                 description: Type of message
 *                 default: text
 *                 example: text
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Attachment URL
 *                     fileName:
 *                       type: string
 *                       description: Original file name
 *                     fileSize:
 *                       type: number
 *                       description: File size in bytes
 *                     mimeType:
 *                       type: string
 *                       description: MIME type of the file
 *                 description: Message attachments
 *               replyTo:
 *                 type: string
 *                 description: ID of the message being replied to
 *                 example: 60d0fe4f5311236168a109cc
 *     responses:
 *       201:
 *         description: Message sent successfully
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
 *                     message:
 *                       $ref: '#/components/schemas/Message'
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
 *       403:
 *         description: Access denied - Not a member of the chat
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
router.post('/', validate(sendMessageSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Send message - Coming soon' });
});

/**
 * @swagger
 * /api/messages/chat/{chatId}:
 *   get:
 *     summary: Get messages from a chat
 *     tags: [Messages]
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
 *           default: 50
 *         description: Number of messages per page
 *       - in: query
 *         name: before
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Get messages before this timestamp
 *       - in: query
 *         name: after
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Get messages after this timestamp
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
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
 *                         $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Not a member of the chat
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
router.get('/chat/:chatId', validate(getMessagesSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get chat messages - Coming soon' });
});

/**
 * @swagger
 * /api/messages/{messageId}:
 *   get:
 *     summary: Get message details by ID
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *         example: 60d0fe4f5311236168a109cc
 *     responses:
 *       200:
 *         description: Message details retrieved successfully
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
 *                     message:
 *                       $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Not a member of the chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:messageId', validate(getMessageSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get message details - Coming soon' });
});

/**
 * @swagger
 * /api/messages/{messageId}:
 *   put:
 *     summary: Edit a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *         example: 60d0fe4f5311236168a109cc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated message content
 *                 example: Hello, how are you doing? (edited)
 *     responses:
 *       200:
 *         description: Message edited successfully
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
 *                     message:
 *                       $ref: '#/components/schemas/Message'
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
 *       403:
 *         description: Access denied - Only message sender can edit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:messageId', validate(editMessageSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Edit message - Coming soon' });
});

/**
 * @swagger
 * /api/messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *         example: 60d0fe4f5311236168a109cc
 *     responses:
 *       200:
 *         description: Message deleted successfully
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
 *         description: Access denied - Only message sender or chat admin can delete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:messageId', validate(deleteMessageSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Delete message - Coming soon' });
});

/**
 * @swagger
 * /api/messages/chat/{chatId}/mark-read:
 *   post:
 *     summary: Mark messages as read in a chat
 *     tags: [Messages]
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Specific message IDs to mark as read (optional - if not provided, marks all unread messages)
 *                 example: ["60d0fe4f5311236168a109cc", "60d0fe4f5311236168a109cd"]
 *               markAll:
 *                 type: boolean
 *                 description: Mark all messages in chat as read
 *                 default: true
 *                 example: true
 *     responses:
 *       200:
 *         description: Messages marked as read successfully
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
 *                     markedCount:
 *                       type: number
 *                       description: Number of messages marked as read
 *                       example: 5
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Not a member of the chat
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
router.post('/chat/:chatId/mark-read', validate(markMessagesReadSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Mark messages as read - Coming soon' });
});

/**
 * @swagger
 * /api/messages/chat/{chatId}/search:
 *   get:
 *     summary: Search messages in a chat
 *     tags: [Messages]
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
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *         example: hello world
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
 *         description: Number of results per page
 *       - in: query
 *         name: messageType
 *         schema:
 *           type: string
 *           enum: [text, image, file, audio, video]
 *         description: Filter by message type
 *       - in: query
 *         name: sender
 *         schema:
 *           type: string
 *         description: Filter by sender user ID
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Search messages from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Search messages until this date
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
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
 *                         $ref: '#/components/schemas/Message'
 *                     query:
 *                       type: string
 *                       description: The search query that was executed
 *                       example: hello world
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Not a member of the chat
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
router.get('/chat/:chatId/search', validate(searchMessagesSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Search messages - Coming soon' });
});

/**
 * @swagger
 * /api/messages/{messageId}/react:
 *   post:
 *     summary: React to a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *         example: 60d0fe4f5311236168a109cc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emoji
 *             properties:
 *               emoji:
 *                 type: string
 *                 description: Emoji reaction
 *                 example: 👍
 *     responses:
 *       200:
 *         description: Reaction added successfully
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
 *                     reaction:
 *                       type: object
 *                       properties:
 *                         emoji:
 *                           type: string
 *                           example: 👍
 *                         user:
 *                           type: string
 *                           description: User ID who reacted
 *                           example: 60d0fe4f5311236168a109ca
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2023-12-01T10:30:00Z
 *       400:
 *         description: Invalid emoji or reaction already exists
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
 *         description: Access denied - Not a member of the chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:messageId/react', validate(reactToMessageSchema), (_req: Request, res: Response) => {
  res.json({ message: 'React to message - Coming soon' });
});

/**
 * @swagger
 * /api/messages/{messageId}/react:
 *   delete:
 *     summary: Remove reaction from a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *         example: 60d0fe4f5311236168a109cc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emoji
 *             properties:
 *               emoji:
 *                 type: string
 *                 description: Emoji reaction to remove
 *                 example: 👍
 *     responses:
 *       200:
 *         description: Reaction removed successfully
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
 *         description: Access denied - Can only remove your own reactions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Message or reaction not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:messageId/react', validate(removeReactionSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Remove reaction from message - Coming soon' });
});

export default router;
