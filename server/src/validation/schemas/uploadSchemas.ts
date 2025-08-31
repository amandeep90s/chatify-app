import { z } from 'zod';
import mongoose from 'mongoose';

// Custom ObjectId validation
const objectIdSchema = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
});

// File upload schema
export const uploadFileSchema = z.object({
  body: z.object({
    folder: z
      .enum(['avatars', 'attachments', 'documents'], {
        message: 'Folder must be one of: avatars, attachments, documents',
      })
      .optional()
      .default('attachments'),
    isPublic: z.boolean().optional().default(false),
  }),
});

// Multiple file upload schema
export const uploadMultipleFilesSchema = z.object({
  body: z.object({
    folder: z
      .enum(['avatars', 'attachments', 'documents'], {
        message: 'Folder must be one of: avatars, attachments, documents',
      })
      .optional()
      .default('attachments'),
    isPublic: z.boolean().optional().default(false),
  }),
});

// Delete file schema
export const deleteFileSchema = z.object({
  body: z.object({
    url: z.string().url('Invalid file URL'),
  }),
});

// Avatar upload schema
export const uploadAvatarSchema = z.object({
  body: z.object({
    folder: z.literal('avatars').optional().default('avatars'),
    isPublic: z.boolean().optional().default(true),
  }),
});

export type UploadFileInput = z.infer<typeof uploadFileSchema>;
export type UploadMultipleFilesInput = z.infer<typeof uploadMultipleFilesSchema>;
export type DeleteFileInput = z.infer<typeof deleteFileSchema>;
export type UploadAvatarInput = z.infer<typeof uploadAvatarSchema>;
