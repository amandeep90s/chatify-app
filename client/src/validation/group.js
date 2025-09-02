import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, 'Group name is required').max(50, 'Group name cannot exceed 50 characters'),
  description: z.string().trim().max(200, 'Description cannot exceed 200 characters').optional(),
  members: z
    .array(z.string())
    .min(1, 'At least one member must be selected')
    .max(100, 'Cannot have more than 100 members'),
});
