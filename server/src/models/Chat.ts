import mongoose, { Document, Schema } from 'mongoose';

export interface IChat extends Document {
  _id: mongoose.Types.ObjectId;
  name?: string;
  isGroupChat: boolean;
  members: mongoose.Types.ObjectId[];
  admins: mongoose.Types.ObjectId[];
  avatar?: string;
  description?: string;
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [50, 'Chat name cannot exceed 50 characters'],
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    avatar: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
      default: '',
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance
chatSchema.index({ members: 1 });
chatSchema.index({ lastMessageAt: -1 });
chatSchema.index({ isGroupChat: 1 });

// Validation: Group chats must have a name
chatSchema.pre('save', function (next) {
  if (this.isGroupChat && !this.name) {
    const error = new Error('Group chats must have a name');
    return next(error);
  }

  // Ensure members array has no duplicates
  this.members = [...new Set(this.members.map(id => id.toString()))].map(id => new mongoose.Types.ObjectId(id));

  // Ensure admins are also members
  if (this.admins && this.admins.length > 0) {
    this.admins = this.admins.filter(adminId =>
      this.members.some(memberId => memberId.toString() === adminId.toString()),
    );
  }

  next();
});

// Validation: Minimum 2 members for any chat
chatSchema.pre('save', function (next) {
  if (this.members.length < 2) {
    const error = new Error('Chat must have at least 2 members');
    return next(error);
  }
  next();
});

// Validation: Maximum 100 members for group chats
chatSchema.pre('save', function (next) {
  if (this.isGroupChat && this.members.length > 100) {
    const error = new Error('Group chat cannot have more than 100 members');
    return next(error);
  }
  next();
});

// For group chats, set creator as admin if no admins specified
chatSchema.pre('save', function (next) {
  if (this.isGroupChat && this.admins.length === 0) {
    this.admins.push(this.createdBy);
  }
  next();
});

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
