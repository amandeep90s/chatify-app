import { User } from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookies
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: { message: 'Not authorized, no token provided' },
      });
      return;
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as {
        id: string;
        iat: number;
        exp: number;
      };

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401).json({
          success: false,
          error: { message: 'User not found' },
        });
        return;
      }

      // Check if user changed password after token was issued
      if (user.passwordChangedAt && decoded.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
        res.status(401).json({
          success: false,
          error: {
            message: 'User recently changed password. Please log in again.',
          },
        });
        return;
      }

      req.user = user;
      next();
    } catch {
      res.status(401).json({
        success: false,
        error: { message: 'Not authorized, invalid token' },
      });
      return;
    }
  } catch {
    res.status(500).json({
      success: false,
      error: { message: 'Server error in authentication' },
    });
  }
};

export const adminOnly = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { message: 'Not authorized' },
      });
      return;
    }

    if (req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        error: { message: 'Access denied. Admin privileges required.' },
      });
      return;
    }

    next();
  } catch {
    res.status(500).json({
      success: false,
      error: { message: 'Server error in admin authorization' },
    });
  }
};

export const verifyAdminSecret = (req: Request, res: Response, next: NextFunction): void => {
  const { adminSecret } = req.body;

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
    res.status(403).json({
      success: false,
      error: { message: 'Invalid admin secret key' },
    });
    return;
  }

  next();
};
