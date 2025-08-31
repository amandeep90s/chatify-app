import logger from '@/config/logger';
import { User } from '@/models/User';
import { CookieOptions, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

// Helper function to send token response
const sendTokenResponse = (user: any, statusCode: number, res: Response): void => {
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  const options: CookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .cookie('refreshToken', refreshToken, {
      ...options,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          role: user.role,
          isOnline: user.isOnline,
          lastSeen: user.lastSeen,
          friends: user.friends,
          isVerified: user.isVerified,
        },
        token,
        refreshToken,
      },
    });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, email, password, bio } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, ...(email ? [{ email }] : [])],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: { message: 'User already exists' },
      });
      return;
    }

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password,
      bio,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error during registration' },
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' },
      });
      return;
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error during login' },
    });
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('token').clearCookie('refreshToken').status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.cookies || req.body;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        error: { message: 'Refresh token not provided' },
      });
      return;
    }

    // Verify refresh token (implement JWT verification)
    // For now, just return an error
    res.status(501).json({
      success: false,
      error: { message: 'Refresh token functionality not implemented yet' },
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error during token refresh' },
    });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friends', 'name username avatar isOnline lastSeen')
      .select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        error: { message: 'User not found' },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    logger.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error fetching user data' },
    });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const allowedUpdates = ['name', 'bio', 'email', 'avatar'];
    const updates = Object.keys(req.body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        error: { message: 'User not found' },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error updating profile' },
    });
  }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    if (!user || !(await user.comparePassword(currentPassword))) {
      res.status(400).json({
        success: false,
        error: { message: 'Current password is incorrect' },
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error changing password' },
    });
  }
};

export const deleteAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.clearCookie('token').clearCookie('refreshToken').status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    logger.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Server error deleting account' },
    });
  }
};
