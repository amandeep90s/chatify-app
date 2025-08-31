import express, { Request, Response } from 'express';
import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  uploadFileSchema,
  uploadMultipleFilesSchema,
  deleteFileSchema,
  uploadAvatarSchema,
} from '@/validation/schemas';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// File upload routes
router.post('/file', validate(uploadFileSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Upload single file - Coming soon' });
});

router.post('/files', validate(uploadMultipleFilesSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Upload multiple files - Coming soon' });
});

router.post('/avatar', validate(uploadAvatarSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Upload avatar - Coming soon' });
});

router.delete('/file', validate(deleteFileSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Delete file - Coming soon' });
});

export default router;
