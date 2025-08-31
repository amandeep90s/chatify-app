import { ApiResponse } from '@/types';
import { NextFunction, Request, Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message?: string,
  data?: T,
  error?: any,
): void => {
  const response: ApiResponse<T> = {
    success,
    ...(message && { message }),
    ...(data && { data }),
    ...(error && { error }),
  };

  res.status(statusCode).json(response);
};

export const sendSuccess = <T>(res: Response, data?: T, message?: string, statusCode: number = 200): void => {
  sendResponse(res, statusCode, true, message, data);
};

export const sendError = (res: Response, message: string, statusCode: number = 500, details?: any): void => {
  sendResponse(res, statusCode, false, undefined, undefined, {
    message,
    ...(details && { details }),
  });
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const generateRandomString = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const validateObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const calculatePagination = (page: number = 1, limit: number = 10, total: number) => {
  const currentPage = Math.max(1, page);
  const currentLimit = Math.min(Math.max(1, limit), 100); // Max 100 items per page
  const totalPages = Math.ceil(total / currentLimit);
  const skip = (currentPage - 1) * currentLimit;

  return {
    page: currentPage,
    limit: currentLimit,
    total,
    pages: totalPages,
    skip,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const escapeRegex = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
