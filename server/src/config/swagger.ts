import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from './logger';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chatify API',
      version: '1.0.0',
      description: 'API documentation for Chatify chat application',
      contact: {
        name: 'Amandeep Singh',
        email: 'contact@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.chatify.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          required: ['success', 'error'],
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'An error occurred',
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          required: ['name', 'username', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '60d0fe4f5311236168a109ca',
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            username: {
              type: 'string',
              description: 'Unique username',
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
              example: 'https://example.com/avatar.jpg',
            },
            bio: {
              type: 'string',
              description: 'User biography',
              example: 'Software developer passionate about technology',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
              example: 'user',
            },
            isOnline: {
              type: 'boolean',
              description: 'Online status',
              example: true,
            },
            lastSeen: {
              type: 'string',
              format: 'date-time',
              description: 'Last seen timestamp',
              example: '2023-12-01T10:30:00Z',
            },
            friends: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of friend user IDs',
            },
            isVerified: {
              type: 'boolean',
              description: 'Account verification status',
              example: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
              example: '2023-12-01T10:30:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2023-12-01T10:30:00Z',
            },
          },
        },
        Chat: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Chat ID',
              example: '60d0fe4f5311236168a109cb',
            },
            name: {
              type: 'string',
              description: 'Chat name (for group chats)',
              example: 'Project Team',
            },
            isGroupChat: {
              type: 'boolean',
              description: 'Whether this is a group chat',
              example: false,
            },
            participants: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
              description: 'Chat participants',
            },
            admin: {
              $ref: '#/components/schemas/User',
              description: 'Group chat admin (if group chat)',
            },
            lastMessage: {
              $ref: '#/components/schemas/Message',
              description: 'Last message in the chat',
            },
            avatar: {
              type: 'string',
              description: 'Group chat avatar URL',
              example: 'https://example.com/group-avatar.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Chat creation timestamp',
              example: '2023-12-01T10:30:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2023-12-01T10:30:00Z',
            },
          },
        },
        Message: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Message ID',
              example: '60d0fe4f5311236168a109cc',
            },
            content: {
              type: 'string',
              description: 'Message content',
              example: 'Hello, how are you?',
            },
            sender: {
              $ref: '#/components/schemas/User',
              description: 'Message sender',
            },
            chat: {
              type: 'string',
              description: 'Chat ID this message belongs to',
              example: '60d0fe4f5311236168a109cb',
            },
            messageType: {
              type: 'string',
              enum: ['text', 'image', 'file', 'audio', 'video'],
              description: 'Type of message',
              example: 'text',
            },
            attachments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    description: 'Attachment URL',
                  },
                  fileName: {
                    type: 'string',
                    description: 'Original file name',
                  },
                  fileSize: {
                    type: 'number',
                    description: 'File size in bytes',
                  },
                  mimeType: {
                    type: 'string',
                    description: 'MIME type of the file',
                  },
                },
              },
              description: 'Message attachments',
            },
            readBy: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  user: {
                    type: 'string',
                    description: 'User ID who read the message',
                  },
                  readAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'When the message was read',
                  },
                },
              },
              description: 'Users who have read this message',
            },
            isEdited: {
              type: 'boolean',
              description: 'Whether the message has been edited',
              example: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Message creation timestamp',
              example: '2023-12-01T10:30:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2023-12-01T10:30:00Z',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User',
                },
                token: {
                  type: 'string',
                  description: 'JWT access token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                refreshToken: {
                  type: 'string',
                  description: 'JWT refresh token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully',
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'array',
              items: {},
            },
            pagination: {
              type: 'object',
              properties: {
                currentPage: {
                  type: 'number',
                  example: 1,
                },
                totalPages: {
                  type: 'number',
                  example: 5,
                },
                totalCount: {
                  type: 'number',
                  example: 50,
                },
                hasNext: {
                  type: 'boolean',
                  example: true,
                },
                hasPrev: {
                  type: 'boolean',
                  example: false,
                },
              },
            },
          },
        },
        FileUpload: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'File ID',
              example: '60d0fe4f5311236168a109ce',
            },
            originalName: {
              type: 'string',
              description: 'Original file name',
              example: 'document.pdf',
            },
            fileName: {
              type: 'string',
              description: 'Stored file name',
              example: '1640995800000_document.pdf',
            },
            url: {
              type: 'string',
              description: 'File URL',
              example: 'https://res.cloudinary.com/chatify/raw/upload/v1640995800/files/document.pdf',
            },
            publicId: {
              type: 'string',
              description: 'Cloudinary public ID',
              example: 'files/1640995800000_document',
            },
            size: {
              type: 'number',
              description: 'File size in bytes',
              example: 2048576,
            },
            mimeType: {
              type: 'string',
              description: 'MIME type',
              example: 'application/pdf',
            },
            uploadedBy: {
              type: 'string',
              description: 'User ID who uploaded the file',
              example: '60d0fe4f5311236168a109ca',
            },
            chatId: {
              type: 'string',
              description: 'Associated chat ID',
              example: '60d0fe4f5311236168a109cb',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Upload timestamp',
              example: '2023-12-01T10:30:00Z',
            },
          },
        },
        MessageReaction: {
          type: 'object',
          properties: {
            emoji: {
              type: 'string',
              description: 'Emoji reaction',
              example: '👍',
            },
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  user: {
                    type: 'string',
                    description: 'User ID',
                    example: '60d0fe4f5311236168a109ca',
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Reaction timestamp',
                    example: '2023-12-01T10:30:00Z',
                  },
                },
              },
              description: 'Users who reacted with this emoji',
            },
            count: {
              type: 'number',
              description: 'Number of users who reacted',
              example: 3,
            },
          },
        },
        Report: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Report ID',
              example: '60d0fe4f5311236168a109cd',
            },
            type: {
              type: 'string',
              enum: ['spam', 'harassment', 'inappropriate', 'abuse', 'other'],
              description: 'Type of report',
              example: 'harassment',
            },
            description: {
              type: 'string',
              description: 'Report description',
              example: 'User sending inappropriate messages',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'critical'],
              description: 'Report priority',
              example: 'high',
            },
            status: {
              type: 'string',
              enum: ['pending', 'resolved', 'dismissed'],
              description: 'Report status',
              example: 'pending',
            },
            reporter: {
              $ref: '#/components/schemas/User',
              description: 'User who reported',
            },
            reportedUser: {
              $ref: '#/components/schemas/User',
              description: 'Reported user',
            },
            reportedChat: {
              $ref: '#/components/schemas/Chat',
              description: 'Reported chat',
            },
            reportedMessage: {
              $ref: '#/components/schemas/Message',
              description: 'Reported message',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Report creation timestamp',
              example: '2023-12-01T10:30:00Z',
            },
            resolvedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Resolution timestamp',
              example: '2023-12-01T11:30:00Z',
            },
            resolvedBy: {
              $ref: '#/components/schemas/User',
              description: 'Admin who resolved the report',
            },
            resolution: {
              type: 'string',
              description: 'Resolution details',
              example: 'User has been warned and message deleted',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  // Swagger UI options
  const swaggerUiOptions = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Chatify API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
    },
  };

  // Swagger JSON endpoint
  app.get('/api/docs/swagger.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // Swagger UI
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

  logger.info('📚 Swagger documentation available at /api/docs');
};

export default specs;
