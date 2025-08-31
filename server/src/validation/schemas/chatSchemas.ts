import { z } from 'zod';
import mongoose from 'mongoose';

// Custom ObjectId validation
const objectIdSchema = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
});

// Create chat schema
export const createChatSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, 'Chat name is required')
        .max(50, 'Chat name cannot exceed 50 characters')
        .optional(),
      isGroupChat: z.boolean().default(false),
      members: z
        .array(objectIdSchema)
        .min(1, 'At least one member is required')
        .max(100, 'Cannot have more than 100 members'),
      description: z.string().trim().max(200, 'Description cannot exceed 200 characters').optional(),
    })
    .refine(
      data => {
        // If it's a group chat, name is required
        if (data.isGroupChat && !data.name) {
          return false;
        }
        return true;
      },
      {
        message: 'Group chats must have a name',
        path: ['name'],
      },
    ),
});

// Update chat schema
export const updateChatSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Chat name cannot be empty')
      .max(50, 'Chat name cannot exceed 50 characters')
      .optional(),
    description: z.string().trim().max(200, 'Description cannot exceed 200 characters').optional(),
    avatar: z.string().url('Invalid avatar URL').optional(),
  }),
});

// Add members schema
export const addMembersSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
  body: z.object({
    members: z
      .array(objectIdSchema)
      .min(1, 'At least one member must be specified')
      .max(50, 'Cannot add more than 50 members at once'),
  }),
});

// Remove member schema
export const removeMemberSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
    memberId: objectIdSchema,
  }),
});

// Make admin schema
export const makeAdminSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
    memberId: objectIdSchema,
  }),
});

// Remove admin schema
export const removeAdminSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
    memberId: objectIdSchema,
  }),
});

// Leave chat schema
export const leaveChatSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
});

// Delete chat schema
export const deleteChatSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
});

// Get chat schema
export const getChatSchema = z.object({
  params: z.object({
    chatId: objectIdSchema,
  }),
});

// Get user chats query schema
export const getUserChatsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 1))
      .refine(val => val > 0, 'Page must be greater than 0'),
    limit: z
      .string()
      .optional()
      .transform(val => (val ? parseInt(val, 10) : 20))
      .refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
    search: z.string().trim().optional(),
  }),
});

export type CreateChatInput = z.infer<typeof createChatSchema>;
export type UpdateChatInput = z.infer<typeof updateChatSchema>;
export type AddMembersInput = z.infer<typeof addMembersSchema>;
export type RemoveMemberInput = z.infer<typeof removeMemberSchema>;
export type MakeAdminInput = z.infer<typeof makeAdminSchema>;
export type RemoveAdminInput = z.infer<typeof removeAdminSchema>;
export type LeaveChatInput = z.infer<typeof leaveChatSchema>;
export type DeleteChatInput = z.infer<typeof deleteChatSchema>;
export type GetChatInput = z.infer<typeof getChatSchema>;
export type GetUserChatsInput = z.infer<typeof getUserChatsSchema>;
