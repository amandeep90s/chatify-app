import { connectDB } from '@/config/database';
import logger, { morganStream } from '@/config/logger';
import { setupSocketIO } from '@/config/socket';
import { setupSwagger } from '@/config/swagger';
import { globalErrorHandler, notFound } from '@/middleware/errorMiddleware';
import adminRoutes from '@/routes/adminRoutes';
import authRoutes from '@/routes/authRoutes';
import chatRoutes from '@/routes/chatRoutes';
import messageRoutes from '@/routes/messageRoutes';
import uploadRoutes from '@/routes/uploadRoutes';
import userRoutes from '@/routes/userRoutes';
import compression from 'compression';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
// import mongoSanitize from 'express-mongo-sanitize'; // Disabled due to Express 5 compatibility
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import morgan from 'morgan';
import { Server as SocketIOServer } from 'socket.io';

// Load environment variables
dotenv.config();

const app: Express = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Trust proxy for deployment behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Data sanitization and security
// Temporary fix: Disable mongo sanitization due to Express 5 compatibility issues
// TODO: Update express-mongo-sanitize or find alternative when available
if (process.env.NODE_ENV === 'production') {
  // Only enable in production with a more careful approach
  app.use('/api', (req, res, next) => {
    if (req.path.startsWith('/docs')) {
      return next();
    }

    // Manual sanitization for production
    const sanitizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            obj[key] = sanitizeObject(obj[key] as Record<string, unknown>);
          }
        }
      }
      return obj;
    };

    // Sanitize request body, query, and params
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }
    if (req.query) {
      // Handle query sanitization carefully due to Express typing
      try {
        const sanitizedQuery = sanitizeObject(req.query as Record<string, unknown>);
        Object.keys(req.query).forEach(key => delete req.query[key]);
        Object.assign(req.query, sanitizedQuery);
      } catch (error) {
        logger.warn('Query sanitization failed:', error);
      }
    }
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }

    next();
  });
} else {
  // Development mode: Skip mongo sanitization for better debugging
  logger.info('⚠️  Mongo sanitization disabled in development mode');
}

app.use(hpp());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', { stream: morganStream }));
} else {
  app.use(morgan('combined', { stream: morganStream }));
}

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/chatify',
      touchAfter: 24 * 3600, // lazy session update
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Server is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-12-01T10:30:00.000Z
 */
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Setup Swagger documentation
if (process.env.NODE_ENV !== 'production') {
  setupSwagger(app);
}

// Error handling middleware
app.use(notFound);
app.use(globalErrorHandler);

// Setup Socket.IO
setupSocketIO(io);

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

export { app, io, server };
