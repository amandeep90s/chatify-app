import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  email?: string;
  password: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'admin';
  isOnline: boolean;
  lastSeen: Date;
  friends: mongoose.Types.ObjectId[];
  friendRequests: {
    sent: mongoose.Types.ObjectId[];
    received: mongoose.Types.ObjectId[];
  };
  isVerified: boolean;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name is too long'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [1, 'Username is required'],
      maxlength: [100, 'Username is too long'],
      match: [/^[A-Za-z0-9]+$/, 'Username can only contain letters and digits'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [128, 'Password must not exceed 128 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      maxlength: [255, 'Bio is too long'],
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friendRequests: {
      sent: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      received: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc: any, ret: any) {
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        return ret;
      },
    },
  },
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ isOnline: 1 });
userSchema.index({ friends: 1 });

// Hash password before saving
userSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    this.password = await bcrypt.hash(this.password, saltRounds);

    // Set passwordChangedAt if it's not a new document
    if (!this.isNew) {
      this.passwordChangedAt = new Date();
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function (): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
  };
  return jwt.sign({ id: this._id.toString() }, (process.env.JWT_SECRET || 'default-secret') as string, options);
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '30d') as any,
  };
  return jwt.sign(
    { id: this._id.toString() },
    (process.env.JWT_REFRESH_SECRET || 'default-refresh-secret') as string,
    options,
  );
};

// Remove user from others' friend lists when user is deleted
userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    await User.updateMany({ friends: this._id }, { $pull: { friends: this._id } });

    await User.updateMany({ 'friendRequests.sent': this._id }, { $pull: { 'friendRequests.sent': this._id } });

    await User.updateMany({ 'friendRequests.received': this._id }, { $pull: { 'friendRequests.received': this._id } });

    next();
  } catch (error) {
    next(error as Error);
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
