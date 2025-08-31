import express, { Request, Response } from 'express';
import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import {
  getUserSchema,
  searchUsersSchema,
  sendFriendRequestSchema,
  respondToFriendRequestSchema,
  removeFriendSchema,
  blockUserSchema,
  unblockUserSchema,
  updateOnlineStatusSchema,
  getFriendsSchema,
  getFriendRequestsSchema,
  cancelFriendRequestSchema,
  updateUserSettingsSchema,
} from '@/validation/schemas';

const router = express.Router();

// All user routes require authentication
router.use(protect);

// User profile routes
router.get('/profile/:userId', validate(getUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get user profile - Coming soon' });
});

router.get('/search', validate(searchUsersSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Search users - Coming soon' });
});

// Friend management routes
router.post('/friend-request', validate(sendFriendRequestSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Send friend request - Coming soon' });
});

router.put('/friend-request/:requestId', validate(respondToFriendRequestSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Respond to friend request - Coming soon' });
});

router.delete('/friend-request/:userId', validate(cancelFriendRequestSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Cancel friend request - Coming soon' });
});

router.delete('/friend/:friendId', validate(removeFriendSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Remove friend - Coming soon' });
});

router.get('/friends', validate(getFriendsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get friends list - Coming soon' });
});

router.get('/friend-requests', validate(getFriendRequestsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Get friend requests - Coming soon' });
});

// Block/Unblock users
router.post('/block', validate(blockUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Block user - Coming soon' });
});

router.post('/unblock', validate(unblockUserSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Unblock user - Coming soon' });
});

// Status and settings
router.put('/online-status', validate(updateOnlineStatusSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Update online status - Coming soon' });
});

router.put('/settings', validate(updateUserSettingsSchema), (_req: Request, res: Response) => {
  res.json({ message: 'Update user settings - Coming soon' });
});

export default router;
