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
