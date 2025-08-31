import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required').max(100, 'Username is too long'),
  password: z.string().trim().min(1, 'Password is required').max(100, 'Password is too long'),
});

export const signUpSchema = z.object({
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
    .refine((val) => !/\s/.test(val), {
      message: 'Password must not contain spaces',
    })
    .refine((val) => !/(.)\1{2,}/.test(val), {
      message: 'Password must not contain repeated characters (e.g., aaa)',
    }),
  avatar: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file || file.length === 0) return true; // Optional field
        return file[0]?.size <= 1 * 1024 * 1024; // 1MB limit
      },
      { message: 'Avatar file size should be less than 5MB' }
    )
    .refine(
      (file) => {
        if (!file || file.length === 0) return true; // Optional field
        return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file[0]?.type);
      },
      { message: 'Avatar must be a valid image file (JPEG, PNG, GIF, or WebP)' }
    ),
});
