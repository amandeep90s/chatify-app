# Chatify - Real-time Chat Application

A full-stack real-time chat application built with React and modern web technologies. Chatify enables users to communicate through private messages and group chats with comprehensive user management features.

## 🚀 Features

### User Authentication & Management

- **User Registration/Login**: Secure user authentication with username-based accounts
- **User Search**: Find and discover other users on the platform
- **Friend Requests**: Send and receive friend requests with real-time Socket.io notifications
- **Friend Management**: Accept friend requests and manage your contact list

### Messaging & Communication

- **Real-time Chat**: Instant messaging with live updates powered by Socket.io
- **File Attachments**: Share files and media in conversations
- **Chat History**: View and manage your conversation history
- **Message Notifications**: Get notified about new messages in real-time
- **Typing Indicators**: See when others are typing
- **Online Status**: View real-time online/offline status of users

### Group Chat Features

- **Group Creation**: Create group chats with 3-100 members
- **Group Administration**:
  - Rename groups
  - Add new members
  - Remove members
  - Delete groups
- **Member Management**:
  - Leave groups
  - Automatic admin assignment when current admin leaves
- **Group Notifications**: Stay updated with group activities

### Chat Management

- **Delete Conversations**: Remove chat history
- **Unfriend Users**: Remove users from your friend list
- **Chat Organization**: Organized chat list for easy navigation

### Admin Dashboard

- **Administrative Access**: Secure admin panel (requires secret key)
- **User Management**: View and manage all users
- **Message Monitoring**: Monitor platform messages
- **Chat Analytics**: View chat statistics and analytics

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **Material-UI (MUI)** - Component library for beautiful UI
- **Socket.io Client** - Real-time bidirectional event-based communication
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Chart.js** - Data visualization for analytics
- **React Hot Toast** - Toast notifications
- **Day.js** - Date manipulation library
- **React Helmet Async** - Document head management

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.io** - Real-time communication engine
- **MongoDB** - NoSQL database for data storage
- **JWT** - JSON Web Tokens for authentication
- **Mongoose** - MongoDB object modeling

### Development Tools

- **ESLint** - Code linting and formatting
- **Vite** - Development server and build tool
- **PNPM** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PNPM (recommended) or npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/amandeep90s/chatify-app.git
   cd chatify-app
   ```

2. **Install client dependencies**

   ```bash
   cd client
   pnpm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   pnpm install
   ```

### Development

1. **Start the development server**

   ```bash
   # Terminal 1 - Start client
   cd client
   pnpm dev

   # Terminal 2 - Start server
   cd server
   pnpm dev
   ```

2. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000` (or configured port)

### Building for Production

```bash
# Build client
cd client
pnpm build

# Build server
cd server
pnpm build
```

## 🔐 Environment Variables

Create `.env` files in both client and server directories:

### Client (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### Server (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chatify
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET_KEY=your_admin_secret_key
```

## 📱 Usage

### For Users

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Find Friends**: Search for users and send friend requests
3. **Start Chatting**: Accept friend requests and begin conversations
4. **Create Groups**: Form group chats with multiple friends
5. **Manage Chats**: Organize, delete, or leave conversations as needed

### For Administrators

1. **Access Dashboard**: Use the secret key to access admin features
2. **Monitor Users**: View user statistics and manage accounts
3. **Review Messages**: Monitor platform communications
4. **Analytics**: View platform usage and engagement metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amandeep Singh**

- GitHub: [@amandeep90s](https://github.com/amandeep90s)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- React community for excellent documentation and support
- All contributors who help improve this project

---

**Note**: This application is designed for educational and demonstration purposes. Please ensure proper security measures are implemented before deploying to production.
