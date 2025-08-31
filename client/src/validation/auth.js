import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100, 'Username is too long'),
  password: z.string().min(1, 'Password is required').max(100, 'Password is too long'),
});

export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  bio: z.string().min(1, 'Bio is required').max(255, 'Bio is too long'),
  username: z.string().min(1, 'Username is required').max(100, 'Username is too long'),
  password: z
    .string()
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
});
