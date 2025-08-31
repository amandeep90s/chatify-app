# Chatify Server

Backend server for the Chatify real-time chat application built with Node.js, Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens
- **Real-time Communication**: Socket.IO for instant messaging
- **Security**: Comprehensive security middleware and best practices
- **Database**: MongoDB with Mongoose ODM
- **File Uploads**: Support for file sharing with Cloudinary integration
- **Validation**: Input validation with express-validator
- **Testing**: Jest with TypeScript support
- **Documentation**: Complete API documentation

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting, Input sanitization
- **File Upload**: Multer with Cloudinary
- **Testing**: Jest with Supertest
- **Package Manager**: pnpm

## 📦 Dependencies

### Core Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `socket.io` - Real-time communication
- `jsonwebtoken` - JWT implementation
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables

### Security Middleware

- `helmet` - Security headers
- `cors` - Cross-origin resource sharing
- `express-rate-limit` - Rate limiting
- `xss` - Cross-site scripting prevention
- `hpp` - HTTP parameter pollution prevention

### Validation & Utils

- `express-validator` - Input validation
- `compression` - Response compression
- `morgan` - HTTP request logger
- `cookie-parser` - Cookie parsing
- `uuid` - UUID generation
- `validator` - String validation

### File Upload

- `multer` - File upload handling
- `cloudinary` - Cloud storage service

### Session Management

- `express-session` - Session middleware
- `connect-mongo` - MongoDB session store

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- pnpm (recommended) or npm

### Installation

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   # Environment
   NODE_ENV=development
   PORT=3000

   # Database
   MONGODB_URI=mongodb://localhost:27017/chatify

   # JWT Secrets
   JWT_SECRET=your_super_secure_jwt_secret
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRES_IN=30d

   # Session
   SESSION_SECRET=your_session_secret

   # Admin
   ADMIN_SECRET_KEY=your_admin_secret

   # CORS
   FRONTEND_URL=http://localhost:5173

   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Start Development Server**

   ```bash
   pnpm dev
   ```

4. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

## 📁 Project Structure

```
src/
├── config/          # Configuration files
│   ├── database.ts  # MongoDB connection
│   └── socket.ts    # Socket.IO setup
├── controllers/     # Route controllers
│   └── authController.ts
├── middleware/      # Custom middleware
│   ├── authMiddleware.ts
│   └── errorMiddleware.ts
├── models/          # Database models
│   ├── User.ts
│   ├── Chat.ts
│   └── Message.ts
├── routes/          # API routes
│   ├── authRoutes.ts
│   ├── userRoutes.ts
│   ├── chatRoutes.ts
│   ├── messageRoutes.ts
│   ├── adminRoutes.ts
│   └── uploadRoutes.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── utils/           # Utility functions
│   └── helpers.ts
├── __tests__/       # Test files
│   └── setup.ts
└── index.ts         # Application entry point
```

## 🔐 Security Features

- **Authentication**: JWT with refresh token rotation
- **Password Security**: bcrypt with configurable salt rounds
- **Rate Limiting**: Configurable request limits per IP
- **Input Validation**: Comprehensive validation with Zod schemas
- **Security Headers**: Helmet.js for secure HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **Session Security**: Secure session management with MongoDB store
- **Parameter Pollution**: Protection against HTTP parameter pollution

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test -- --coverage
```

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `DELETE /api/auth/account` - Delete account

### User Management

- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/search` - Search users
- `POST /api/users/friend-request` - Send friend request
- `PUT /api/users/friend-request/accept` - Accept friend request
- `DELETE /api/users/friend-request/decline` - Decline friend request

### Chat Management

- `GET /api/chats` - Get user's chats
- `POST /api/chats` - Create new chat
- `GET /api/chats/:id` - Get chat details
- `PUT /api/chats/:id` - Update chat
- `DELETE /api/chats/:id` - Delete chat
- `POST /api/chats/:id/members` - Add members
- `DELETE /api/chats/:id/members/:userId` - Remove member

### Message Management

- `GET /api/messages/:chatId` - Get chat messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id` - Edit message
- `DELETE /api/messages/:id` - Delete message

### File Upload

- `POST /api/upload/image` - Upload image
- `POST /api/upload/file` - Upload file

### Admin (Protected)

- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/chats` - Get all chats
- `DELETE /api/admin/users/:id` - Delete user

## 🌐 Socket.IO Events

### Connection Events

- `connection` - User connects
- `disconnect` - User disconnects

### Chat Events

- `join-chat` - Join chat room
- `leave-chat` - Leave chat room
- `new-message` - Send new message
- `message-received` - Receive new message
- `typing-start` - Start typing indicator
- `typing-stop` - Stop typing indicator
- `mark-messages-read` - Mark messages as read

### User Events

- `user-online` - User comes online
- `user-offline` - User goes offline
- `friend-request-sent` - Friend request sent
- `friend-request-received` - Friend request received
- `friend-request-accepted` - Friend request accepted

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
SESSION_SECRET=your_production_session_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Build Commands

```bash
# Build TypeScript
pnpm build

# Start production server
pnpm start

# Start with PM2
pm2 start dist/index.js --name chatify-server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
