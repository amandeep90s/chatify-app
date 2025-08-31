import mongoose, { Document, Schema } from 'mongoose';

export interface IAttachment {
  url: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'file';
  name: string;
  size?: number;
}

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId;
  content: string;
  attachments: IAttachment[];
  messageType: 'text' | 'image' | 'video' | 'audio' | 'file' | 'system';
  readBy: mongoose.Types.ObjectId[];
  editedAt?: Date;
  replyTo?: mongoose.Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const attachmentSchema = new Schema<IAttachment>(
  {
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'document', 'file'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
  },
  { _id: false },
);

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    content: {
      type: String,
      required: function (this: IMessage) {
        return this.messageType === 'text' || this.messageType === 'system';
      },
      maxlength: [1000, 'Message content cannot exceed 1000 characters'],
    },
    attachments: [attachmentSchema],
    messageType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio', 'file', 'system'],
      default: 'text',
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    editedAt: {
      type: Date,
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance
messageSchema.index({ chat: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ readBy: 1 });
messageSchema.index({ isDeleted: 1 });

// Validation: Either content or attachments must be present
messageSchema.pre('save', function (next) {
  if (!this.content && (!this.attachments || this.attachments.length === 0)) {
    const error = new Error('Message must have either content or attachments');
    return next(error);
  }
  next();
});

// Auto-add sender to readBy when message is created
messageSchema.pre('save', function (next) {
  if (this.isNew && !this.readBy.includes(this.sender)) {
    this.readBy.push(this.sender);
  }
  next();
});

// Set deletedAt when isDeleted is set to true
messageSchema.pre('save', function (next) {
  if (this.isDeleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  next();
});

// Transform output to hide content if deleted
messageSchema.methods.toJSON = function () {
  const message = this.toObject();

  if (message.isDeleted) {
    message.content = 'This message was deleted';
    message.attachments = [];
  }

  return message;
};

export const Message = mongoose.model<IMessage>('Message', messageSchema);
