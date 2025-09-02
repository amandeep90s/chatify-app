export const sampleChats = [
  {
    _id: '1',
    name: 'John Doe',
    avatar: ['https://i.pravatar.cc/150?img=1'],
    members: ['1', '2', '3'],
    groupChat: false,
  },
  {
    _id: '2',
    name: 'Jane Smith',
    avatar: ['https://i.pravatar.cc/150?img=2'],
    members: ['1', '2', '3'],
    groupChat: false,
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    avatar: ['https://i.pravatar.cc/150?img=3'],
    members: ['1', '2', '3'],
    groupChat: false,
  },
];

// Sample current chat for the Chat page
export const sampleCurrentChat = {
  _id: '1',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
  isGroup: false,
  participants: [
    {
      _id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ],
};

export const sampleUsers = [
  {
    _id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    _id: '3',
    name: 'Bob Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

export const sampleNotifications = [
  {
    _id: '1',
    sender: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    type: 'friend_request',
  },
  {
    _id: '2',
    sender: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    type: 'friend_request',
  },
  {
    _id: '3',
    sender: {
      name: 'Bob Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    type: 'group_invite',
    message: 'Bob Johnson invited you to join "React Developers" group',
  },
  {
    _id: '4',
    sender: {
      name: 'Alice Cooper',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    type: 'message',
    message: 'Alice Cooper sent you a message',
  },
];

export const sampleMessages = [
  {
    _id: '1',
    sender: {
      _id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'Hey there! How are you doing?',
    messageType: 'text',
    attachments: [],
    readBy: ['1', '2'],
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    isOwn: false,
  },
  {
    _id: '2',
    sender: {
      _id: '2',
      name: 'You',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: "I'm doing great! Thanks for asking. How about you?",
    messageType: 'text',
    attachments: [],
    readBy: ['1', '2'],
    createdAt: new Date(Date.now() - 3300000), // 55 minutes ago
    isOwn: true,
  },
  {
    _id: '3',
    sender: {
      _id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'Check out this cool image I found!',
    messageType: 'image',
    attachments: [
      {
        url: 'https://picsum.photos/400/300',
        type: 'image',
        name: 'cool-image.jpg',
        size: 125000,
      },
    ],
    readBy: ['1'],
    createdAt: new Date(Date.now() - 3000000), // 50 minutes ago
    isOwn: false,
  },
  {
    _id: '4',
    sender: {
      _id: '2',
      name: 'You',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: "That's awesome! 😍",
    messageType: 'text',
    attachments: [],
    readBy: ['2'],
    createdAt: new Date(Date.now() - 2700000), // 45 minutes ago
    isOwn: true,
  },
  {
    _id: '5',
    sender: {
      _id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: "Here's that document we discussed earlier.",
    messageType: 'file',
    attachments: [
      {
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        type: 'document',
        name: 'project-proposal.pdf',
        size: 245000,
      },
    ],
    readBy: ['1'],
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    isOwn: false,
  },
  {
    _id: '6',
    sender: {
      _id: '2',
      name: 'You',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    content: "Perfect! I'll review it and get back to you by tomorrow.",
    messageType: 'text',
    attachments: [],
    readBy: [],
    createdAt: new Date(Date.now() - 600000), // 10 minutes ago
    isOwn: true,
  },
];
