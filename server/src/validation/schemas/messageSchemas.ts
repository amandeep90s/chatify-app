import { z } from 'zod';
import mongoose from 'mongoose';

// Custom ObjectId validation
const objectIdSchema = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
});

// Attachment schema
const attachmentSchema = z.object({
  url: z.string().url('Invalid attachment URL'),
  type: z.enum(['image', 'video', 'audio', 'document', 'file']),
  name: z.string().min(1, 'Attachment name is required'),
  size: z.number().positive('Attachment size must be positive').optional(),
});

// Send message schema
export const sendMessageSchema = z.object({
  body: z
    .object({
      chat: objectIdSchema,
      content: z.string().trim().max(1000, 'Message content cannot exceed 1000 characters').optional(),
      attachments: z.array(attachmentSchema).optional(),
      messageType: z.enum(['text', 'image', 'video', 'audio', 'file', 'system']).default('text'),
      replyTo: objectIdSchema.optional(),
    })
    .refine(
      data => {
        // Either content or attachments must be present
        return (data.content && data.content.length > 0) || (data.attachments && data.attachments.length > 0);
      },
      {
        message: 'Message must have either content or attachments',
        path: ['content'],
      },
    ),
});

// Edit message schema
export const editMessageSchema = z.object({
  params: z.object({
    messageId: objectIdSchema,
  }),
  body: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Message content cannot be empty')
      .max(1000, 'Message content cannot exceed 1000 characters'),
  }),
});

// Delete message schema
export const deleteMessageSchema = z.object({
  params: z.object({
    messageId: objectIdSchema,
  }),
});

// Get messages schema
export const getMessagesSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 1))
      .refine(val => val > 0, 'Page must be greater than 0'),
    limit: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 50))
      .refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
    before: objectIdSchema.optional(), // For pagination by message ID
  }),
});

// Mark messages as read schema
export const markMessagesReadSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
  body: z.object({
    messageIds: z
      .array(objectIdSchema)
      .min(1, 'At least one message ID is required')
      .max(100, 'Cannot mark more than 100 messages at once'),
  }),
});

// Get message schema
export const getMessageSchema = z.object({
  params: z.object({
    messageId: objectIdSchema,
  }),
});

// Search messages schema
export const searchMessagesSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
  query: z.object({
    q: z.string().trim().min(1, 'Search query is required'),
    page: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 1))
      .refine(val => val > 0, 'Page must be greater than 0'),
    limit: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 20))
      .refine(val => val > 0 && val <= 50, 'Limit must be between 1 and 50'),
  }),
});

// React to message schema
export const reactToMessageSchema = z.object({
  params: z.object({
    messageId: objectIdSchema,
  }),
  body: z.object({
    reaction: z.string().trim().min(1, 'Reaction is required').max(10, 'Reaction cannot exceed 10 characters'),
  }),
});

// Remove reaction schema
export const removeReactionSchema = z.object({
  params: z.object({
    messageId: objectIdSchema,
  }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type EditMessageInput = z.infer<typeof editMessageSchema>;
export type DeleteMessageInput = z.infer<typeof deleteMessageSchema>;
export type GetMessagesInput = z.infer<typeof getMessagesSchema>;
export type MarkMessagesReadInput = z.infer<typeof markMessagesReadSchema>;
export type GetMessageInput = z.infer<typeof getMessageSchema>;
export type SearchMessagesInput = z.infer<typeof searchMessagesSchema>;
export type ReactToMessageInput = z.infer<typeof reactToMessageSchema>;
export type RemoveReactionInput = z.infer<typeof removeReactionSchema>;
