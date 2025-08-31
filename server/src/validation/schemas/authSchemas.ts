import { z } from 'zod';

// User registration schema
export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
    bio: z.string().trim().min(1, 'Bio is required').max(255, 'Bio is too long'),
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .max(100, 'Username is too long')
      .regex(/^[A-Za-z0-9]+$/, 'Username can only contain letters and digits'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must not exceed 128 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character (!@#$%^&*)')
      .refine(val => !/\s/.test(val), {
        message: 'Password must not contain spaces',
      })
      .refine(val => !/(.)\1{2,}/.test(val), {
        message: 'Password must not contain repeated characters (e.g., aaa)',
      }),
    email: z.string().email('Please provide a valid email').optional().or(z.literal('')),
  }),
});

// User login schema
export const loginSchema = z.object({
  body: z.object({
    username: z.string().trim().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// Update profile schema
export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .optional(),
    bio: z.string().trim().max(200, 'Bio cannot exceed 200 characters').optional(),
    email: z.string().email('Please provide a valid email').optional().or(z.literal('')),
  }),
});

// Change password schema
export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'New password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
  }),
});

// Refresh token schema
export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email'),
  }),
});

// Password reset schema
export const passwordResetSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
