import {
  changePassword,
  deleteAccount,
  getMe,
  login,
  logout,
  refreshToken,
  register,
  updateProfile,
} from '@/controllers/authController';
import { protect } from '@/middleware/authMiddleware';
import { validate } from '@/validation/middleware';
import { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } from '@/validation/schemas';
import express from 'express';

const router = express.Router();

// Public routes
router.post('/register', validate(registerSchema), register);

router.post('/login', validate(loginSchema), login);

router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/me', protect, getMe);

router.put('/profile', protect, validate(updateProfileSchema), updateProfile);

router.put('/change-password', protect, validate(changePasswordSchema), changePassword);

router.delete('/account', protect, deleteAccount);

export default router;
