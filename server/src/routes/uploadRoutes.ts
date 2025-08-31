import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  deleteFileSchema,
  uploadAvatarSchema,
  uploadFileSchema,
  uploadMultipleFilesSchema,
} from '@/validation/schemas';
import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and management operations
 */

// All upload routes require authentication
router.use(protect);

/**
 * @swagger
 * /api/upload/file:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *               chatId:
 *                 type: string
 *                 description: Chat ID this file belongs to (optional)
 *                 example: 60d0fe4f5311236168a109cb
 *               description:
 *                 type: string
 *                 description: File description
 *                 example: Important document for the project
 *     responses:
 *       201:
 *         description: File uploaded successfully
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
 *                     file:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 60d0fe4f5311236168a109ce
 *                         originalName:
 *                           type: string
 *                           example: document.pdf
 *                         fileName:
 *                           type: string
 *                           example: 1640995800000_document.pdf
 *                         url:
 *                           type: string
 *                           example: https://res.cloudinary.com/chatify/raw/upload/v1640995800/files/document.pdf
 *                         publicId:
 *                           type: string
 *                           example: files/1640995800000_document
 *                         size:
 *                           type: number
 *                           example: 2048576
 *                         mimeType:
 *                           type: string
 *                           example: application/pdf
 *                         uploadedBy:
 *                           type: string
 *                           example: 60d0fe4f5311236168a109ca
 *                         chatId:
 *                           type: string
 *                           example: 60d0fe4f5311236168a109cb
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2023-12-01T10:30:00Z
 *       400:
 *         description: Invalid file or file too large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               fileTooLarge:
 *                 summary: File too large
 *                 value:
 *                   success: false
 *                   error:
 *                     message: File size exceeds maximum limit of 10MB
 *               invalidFileType:
 *                 summary: Invalid file type
 *                 value:
 *                   success: false
 *                   error:
 *                     message: File type not allowed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       413:
 *         description: Payload too large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Upload service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/file', validate(uploadFileSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Upload single file - Coming soon' });
});

/**
 * @swagger
 * /api/upload/files:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Multiple files to upload (max 5 files)
 *               chatId:
 *                 type: string
 *                 description: Chat ID these files belong to (optional)
 *                 example: 60d0fe4f5311236168a109cb
 *               description:
 *                 type: string
 *                 description: Description for all files
 *                 example: Project attachments
 *     responses:
 *       201:
 *         description: Files uploaded successfully
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
 *                     files:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109ce
 *                           originalName:
 *                             type: string
 *                             example: document1.pdf
 *                           fileName:
 *                             type: string
 *                             example: 1640995800000_document1.pdf
 *                           url:
 *                             type: string
 *                             example: https://res.cloudinary.com/chatify/raw/upload/v1640995800/files/document1.pdf
 *                           publicId:
 *                             type: string
 *                             example: files/1640995800000_document1
 *                           size:
 *                             type: number
 *                             example: 2048576
 *                           mimeType:
 *                             type: string
 *                             example: application/pdf
 *                           uploadedBy:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109ca
 *                           chatId:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109cb
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-12-01T10:30:00Z
 *                     uploadedCount:
 *                       type: number
 *                       example: 3
 *                     failedCount:
 *                       type: number
 *                       example: 0
 *                     errors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           fileName:
 *                             type: string
 *                           error:
 *                             type: string
 *                       example: []
 *       400:
 *         description: Invalid files or too many files
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               tooManyFiles:
 *                 summary: Too many files
 *                 value:
 *                   success: false
 *                   error:
 *                     message: Maximum 5 files allowed per upload
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       413:
 *         description: Payload too large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Upload service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/files', validate(uploadMultipleFilesSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Upload multiple files - Coming soon' });
});

/**
 * @swagger
 * /api/upload/avatar:
 *   post:
 *     summary: Upload user or chat avatar
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Avatar image file (JPG, PNG, WebP, max 5MB)
 *               type:
 *                 type: string
 *                 enum: [user, chat]
 *                 description: Avatar type
 *                 default: user
 *                 example: user
 *               chatId:
 *                 type: string
 *                 description: Chat ID (required if type is 'chat')
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Avatar uploaded successfully
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
 *                     avatar:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: https://res.cloudinary.com/chatify/image/upload/v1640995800/avatars/user_60d0fe4f5311236168a109ca.jpg
 *                         publicId:
 *                           type: string
 *                           example: avatars/user_60d0fe4f5311236168a109ca
 *                         width:
 *                           type: number
 *                           example: 200
 *                         height:
 *                           type: number
 *                           example: 200
 *                         format:
 *                           type: string
 *                           example: jpg
 *                         size:
 *                           type: number
 *                           example: 45678
 *       400:
 *         description: Invalid image file or dimensions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidFormat:
 *                 summary: Invalid image format
 *                 value:
 *                   success: false
 *                   error:
 *                     message: Only JPG, PNG, and WebP images are allowed
 *               fileTooLarge:
 *                 summary: File too large
 *                 value:
 *                   success: false
 *                   error:
 *                     message: Avatar file size must be less than 5MB
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Not authorized to update this avatar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat not found (when uploading chat avatar)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Upload service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/avatar', validate(uploadAvatarSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Upload avatar - Coming soon' });
});

/**
 * @swagger
 * /api/upload/file:
 *   delete:
 *     summary: Delete uploaded file
 *     tags: [Upload]
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
 *               - fileId
 *             properties:
 *               fileId:
 *                 type: string
 *                 description: ID of the file to delete
 *                 example: 60d0fe4f5311236168a109ce
 *               publicId:
 *                 type: string
 *                 description: Cloudinary public ID (alternative to fileId)
 *                 example: files/1640995800000_document
 *               reason:
 *                 type: string
 *                 description: Reason for deletion
 *                 example: File no longer needed
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: File deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedFileId:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ce
 *                     cloudinaryResult:
 *                       type: object
 *                       properties:
 *                         result:
 *                           type: string
 *                           example: ok
 *                         publicId:
 *                           type: string
 *                           example: files/1640995800000_document
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Access denied - Can only delete your own files
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Deletion service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/file', validate(deleteFileSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Delete file - Coming soon' });
});

export default router;
