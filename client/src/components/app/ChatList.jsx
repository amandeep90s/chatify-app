import { Stack } from '@mui/material';

import ChatItem from '@/components/app/ChatItem';

function ChatList(props) {
  const {
    width = '100%',
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{ chatId: '', count: 0 }],
    handleDeleteChat,
  } = props;

  return (
    <Stack width={width} direction={'column'}>
      {chats?.map((chat, index) => {
        const { avatar, name, _id, groupChat, members } = chat;

        const newMessageAlert = newMessagesAlert.find((msg) => msg.chatId === _id);

        const isOnline = members.some((memberId) => onlineUsers.includes(memberId));

        return (
          <ChatItem
            key={_id}
            id={_id}
            newMessageAlert={newMessageAlert}
            chat={chat}
            name={name}
            isOnline={isOnline}
            avatar={avatar}
            index={index}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
}

export default ChatList;
