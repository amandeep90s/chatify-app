import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';

import { useLoading } from '@/hooks';

import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

// Styled components
const ChatWindowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
}));

const ChatWindow = memo(
  ({
    chat,
    messages = [],
    currentUserId,
    onSendMessage,
    onAttachFile,
    onLoadMoreMessages,
    hasMoreMessages = false,
    loading = false,
    disabled = false,
    showHeader = true,
    showInput = true,
    placeholder = 'Type a message...',
    emptyMessage,
    onChatAction,
  }) => {
    const [localLoading, setLocalLoading] = useState(false);
    const { loading: hookLoading } = useLoading();

    const isLoading = loading || localLoading || hookLoading;

    // Handle sending message with loading state
    const handleSendMessage = useCallback(
      async (content) => {
        if (!onSendMessage || disabled || isLoading) return;

        try {
          setLocalLoading(true);
          await onSendMessage(content);
        } catch (error) {
          console.error('Failed to send message:', error);
        } finally {
          setLocalLoading(false);
        }
      },
      [onSendMessage, disabled, isLoading]
    );

    // Handle file attachment with loading state
    const handleAttachFile = useCallback(
      async (files) => {
        if (!onAttachFile || disabled || isLoading) return;

        try {
          setLocalLoading(true);
          await onAttachFile(files);
        } catch (error) {
          console.error('Failed to attach files:', error);
        } finally {
          setLocalLoading(false);
        }
      },
      [onAttachFile, disabled, isLoading]
    );

    // Handle chat actions
    const handleChatAction = useCallback(
      (action, data) => {
        if (onChatAction) {
          onChatAction(action, data);
        }
      },
      [onChatAction]
    );

    const displayEmptyMessage =
      emptyMessage ||
      (chat?.isGroup
        ? `Start a conversation in ${chat.name}`
        : `Start a conversation with ${chat?.participants?.[0]?.name || 'this contact'}`);

    return (
      <ChatWindowContainer>
        {showHeader && chat && (
          <ChatHeader
            chat={chat}
            isGroup={chat.isGroup}
            onCallClick={() => handleChatAction('call', chat)}
            onVideoCallClick={() => handleChatAction('videoCall', chat)}
            onSearchClick={() => handleChatAction('search', chat)}
            onInfoClick={() => handleChatAction('info', chat)}
            onDeleteChat={() => handleChatAction('delete', chat)}
            onBlockUser={() => handleChatAction('block', chat)}
            onMuteChat={() => handleChatAction('mute', chat)}
            isMuted={chat.isMuted}
          />
        )}

        <MessageList
          messages={messages}
          loading={isLoading}
          currentUserId={currentUserId}
          onLoadMore={onLoadMoreMessages}
          hasMore={hasMoreMessages}
          emptyMessage={displayEmptyMessage}
        />

        {showInput && (
          <MessageInput
            onSendMessage={handleSendMessage}
            onAttachFile={handleAttachFile}
            onEmojiClick={() => handleChatAction('emoji')}
            disabled={disabled || isLoading}
            placeholder={placeholder}
          />
        )}
      </ChatWindowContainer>
    );
  }
);

ChatWindow.displayName = 'ChatWindow';

ChatWindow.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isGroup: PropTypes.bool,
    isMuted: PropTypes.bool,
    participants: PropTypes.array,
  }),
  messages: PropTypes.array,
  currentUserId: PropTypes.string.isRequired,
  onSendMessage: PropTypes.func,
  onAttachFile: PropTypes.func,
  onLoadMoreMessages: PropTypes.func,
  hasMoreMessages: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  showInput: PropTypes.bool,
  placeholder: PropTypes.string,
  emptyMessage: PropTypes.string,
  onChatAction: PropTypes.func,
};

export default ChatWindow;
