import { Request } from 'express';
import { z } from 'zod';

// Extended Request interface with validated data
export interface ValidatedRequest<T extends z.ZodSchema<any>> extends Request {
  validatedData?: z.infer<T>;
}

// Utility to get validated data from request
export const getValidatedData = <T extends z.ZodSchema<any>>(req: ValidatedRequest<T>): any => {
  return {
    body: req.body,
    query: req.query,
    params: req.params,
  };
};

// Common validation patterns
export const commonValidations = {
  objectId: z.string().refine(val => /^[0-9a-fA-F]{24}$/.test(val), 'Invalid ObjectId format'),

  email: z.string().email('Invalid email format').toLowerCase(),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),

  pagination: {
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
  },

  searchQuery: z
    .string()
    .trim()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query cannot exceed 100 characters'),

  url: z.string().url('Invalid URL format'),

  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),

  dateRange: {
    startDate: z
      .string()
      .optional()
      .refine(val => !val || !isNaN(Date.parse(val)), 'Invalid start date format'),
    endDate: z
      .string()
      .optional()
      .refine(val => !val || !isNaN(Date.parse(val)), 'Invalid end date format'),
  },
};

// File validation helpers
export const fileValidations = {
  image: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  video: {
    mimeTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/webm'],
    maxSize: 50 * 1024 * 1024, // 50MB
  },
  audio: {
    mimeTypes: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  document: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

// Sanitization helpers
export const sanitizers = {
  html: (str: string): string => {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  searchQuery: (str: string): string => {
    return str.trim().replace(/[<>]/g, '');
  },

  filename: (str: string): string => {
    return str.replace(/[^a-zA-Z0-9._-]/g, '_');
  },
};

// Custom error class for validation
export class ValidationError extends Error {
  public statusCode: number;
  public errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;

  constructor(message: string, errors: Array<{ field: string; message: string; code: string }>) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.errors = errors;
  }
}
