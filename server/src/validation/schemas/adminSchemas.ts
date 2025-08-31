import { z } from 'zod';
import mongoose from 'mongoose';

// Custom ObjectId validation
const objectIdSchema = z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
});

// Get all users schema (admin only)
export const getAllUsersSchema = z.object({
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
    role: z.enum(['user', 'admin']).optional(),
    isVerified: z
      .string()
      .optional()
      .transform(val => val === 'true')
      .optional(),
    isOnline: z
      .string()
      .optional()
      .transform(val => val === 'true')
      .optional(),
  }),
});

// Get user by ID schema (admin only)
export const getAdminUserSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
});

// Update user role schema (admin only)
export const updateUserRoleSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
  body: z.object({
    role: z.enum(['user', 'admin'], {
      message: "Role must be either 'user' or 'admin'",
    }),
  }),
});

// Ban user schema (admin only)
export const banUserSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
  body: z.object({
    reason: z
      .string()
      .trim()
      .min(5, 'Ban reason must be at least 5 characters')
      .max(500, 'Ban reason cannot exceed 500 characters'),
    duration: z
      .number()
      .positive('Duration must be positive')
      .max(365, 'Ban duration cannot exceed 365 days')
      .optional(), // If not provided, it's a permanent ban
  }),
});

// Unban user schema (admin only)
export const unbanUserSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
});

// Delete user schema (admin only)
export const deleteUserSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
  body: z.object({
    reason: z
      .string()
      .trim()
      .min(5, 'Deletion reason must be at least 5 characters')
      .max(500, 'Deletion reason cannot exceed 500 characters'),
  }),
});

// Verify user schema (admin only)
export const verifyUserSchema = z.object({
  params: z.object({
    userId: objectIdSchema,
  }),
});

// Get system stats schema (admin only)
export const getSystemStatsSchema = z.object({
  query: z.object({
    period: z
      .enum(['day', 'week', 'month', 'year'], {
        message: 'Period must be one of: day, week, month, year',
      })
      .optional()
      .default('month'),
  }),
});

// Get chat reports schema (admin only)
export const getChatReportsSchema = z.object({
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
    status: z.enum(['pending', 'resolved', 'dismissed']).optional(),
  }),
});

// Resolve chat report schema (admin only)
export const resolveChatReportSchema = z.object({
  params: z.object({
    reportId: objectIdSchema,
  }),
  body: z.object({
    action: z.enum(['resolve', 'dismiss'], {
      message: "Action must be either 'resolve' or 'dismiss'",
    }),
    notes: z.string().trim().max(1000, 'Notes cannot exceed 1000 characters').optional(),
  }),
});

export type GetAllUsersInput = z.infer<typeof getAllUsersSchema>;
export type GetAdminUserInput = z.infer<typeof getAdminUserSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type BanUserInput = z.infer<typeof banUserSchema>;
export type UnbanUserInput = z.infer<typeof unbanUserSchema>;
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
export type VerifyUserInput = z.infer<typeof verifyUserSchema>;
export type GetSystemStatsInput = z.infer<typeof getSystemStatsSchema>;
export type GetChatReportsInput = z.infer<typeof getChatReportsSchema>;
export type ResolveChatReportInput = z.infer<typeof resolveChatReportSchema>;
