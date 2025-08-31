import { z } from 'zod';
import mongoose from 'mongoose';

// Custom ObjectId validation
const objectIdSchema = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
});

// Get user schema
export const getUserSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
});

// Search users schema
export const searchUsersSchema = z.object({
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

// Send friend request schema
export const sendFriendRequestSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
  }),
});

// Respond to friend request schema
export const respondToFriendRequestSchema = z.object({
  params: z.object({
    requestId: objectIdSchema,
  }),
  body: z.object({
    action: z.enum(['accept', 'decline'], {
      message: "Action must be either 'accept' or 'decline'",
    }),
  }),
});

// Remove friend schema
export const removeFriendSchema = z.object({
  params: z.object({
    friendId: objectIdSchema,
  }),
});

// Block user schema
export const blockUserSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
  }),
});

// Unblock user schema
export const unblockUserSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
  }),
});

// Update online status schema
export const updateOnlineStatusSchema = z.object({
  body: z.object({
    isOnline: z.boolean(),
  }),
});

// Get friends schema
export const getFriendsSchema = z.object({
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

// Get friend requests schema
export const getFriendRequestsSchema = z.object({
  query: z.object({
    type: z.enum(['sent', 'received'], {
      message: "Type must be either 'sent' or 'received'",
    }),
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
  }),
});

// Cancel friend request schema
export const cancelFriendRequestSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
});

// Update user settings schema
export const updateUserSettingsSchema = z.object({
  body: z.object({
    notifications: z
      .object({
        email: z.boolean().optional(),
        push: z.boolean().optional(),
        sound: z.boolean().optional(),
      })
      .optional(),
    privacy: z
      .object({
        profileVisibility: z.enum(['public', 'friends', 'private']).optional(),
        lastSeenVisibility: z.enum(['everyone', 'friends', 'nobody']).optional(),
        onlineStatusVisibility: z.enum(['everyone', 'friends', 'nobody']).optional(),
      })
      .optional(),
    theme: z.enum(['light', 'dark', 'system']).optional(),
    language: z.string().min(2).max(10).optional(),
  }),
});

export type GetUserInput = z.infer<typeof getUserSchema>;
export type SearchUsersInput = z.infer<typeof searchUsersSchema>;
export type SendFriendRequestInput = z.infer<typeof sendFriendRequestSchema>;
export type RespondToFriendRequestInput = z.infer<typeof respondToFriendRequestSchema>;
export type RemoveFriendInput = z.infer<typeof removeFriendSchema>;
export type BlockUserInput = z.infer<typeof blockUserSchema>;
export type UnblockUserInput = z.infer<typeof unblockUserSchema>;
export type UpdateOnlineStatusInput = z.infer<typeof updateOnlineStatusSchema>;
export type GetFriendsInput = z.infer<typeof getFriendsSchema>;
export type GetFriendRequestsInput = z.infer<typeof getFriendRequestsSchema>;
export type CancelFriendRequestInput = z.infer<typeof cancelFriendRequestSchema>;
export type UpdateUserSettingsInput = z.infer<typeof updateUserSettingsSchema>;
