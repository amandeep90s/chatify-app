import { IUser } from '@/models/User';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
  message?: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SocketUser {
  userId: string;
  socketId: string;
  isOnline: boolean;
}

export interface ChatMember {
  userId: string;
  joinedAt: Date;
  role: 'member' | 'admin';
}

export interface MessageAttachment {
  url: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'file';
  name: string;
  size?: number;
}
