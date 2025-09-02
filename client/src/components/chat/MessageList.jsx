import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { memo, useEffect, useRef } from 'react';

import Loader from '@/components/common/Loader';

import MessageItem from './MessageItem';

// Styled components
const MessageListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const MessagesScrollArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: theme.palette.text.disabled,
    },
  },
}));

const DateDivider = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  '& .MuiDivider-root': {
    flex: 1,
  },
}));

const DateLabel = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  margin: theme.spacing(0, 2),
  whiteSpace: 'nowrap',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Helper function to group messages by date
const groupMessagesByDate = (messages) => {
  const groups = {};

  messages.forEach((message) => {
    const date = dayjs(message.createdAt).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return groups;
};

// Helper function to format date for display
const formatDateLabel = (date) => {
  const messageDate = dayjs(date);
  const today = dayjs();
  const yesterday = today.subtract(1, 'day');

  if (messageDate.isSame(today, 'day')) {
    return 'Today';
  } else if (messageDate.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else if (messageDate.isSame(today, 'year')) {
    return messageDate.format('MMM DD');
  } else {
    return messageDate.format('MMM DD, YYYY');
  }
};

const MessageList = memo(
  ({
    messages = [],
    loading = false,
    currentUserId,
    onLoadMore,
    hasMore = false,
    emptyMessage = 'No messages yet. Start the conversation!',
  }) => {
    const scrollAreaRef = useRef(null);
    const previousMessageCount = useRef(messages.length);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
      if (scrollAreaRef.current && messages.length > previousMessageCount.current) {
        const scrollArea = scrollAreaRef.current;
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
      previousMessageCount.current = messages.length;
    }, [messages.length]);

    // Handle scroll for loading more messages
    useEffect(() => {
      const scrollArea = scrollAreaRef.current;
      if (!scrollArea || !onLoadMore || !hasMore) return;

      const handleScroll = () => {
        if (scrollArea.scrollTop === 0 && !loading) {
          onLoadMore();
        }
      };

      scrollArea.addEventListener('scroll', handleScroll);
      return () => scrollArea.removeEventListener('scroll', handleScroll);
    }, [onLoadMore, hasMore, loading]);

    if (loading && messages.length === 0) {
      return (
        <MessageListContainer>
          <LoadingContainer>
            <Loader size={40} />
          </LoadingContainer>
        </MessageListContainer>
      );
    }

    if (messages.length === 0) {
      return (
        <MessageListContainer>
          <EmptyState>
            <Typography variant="h6" gutterBottom>
              {emptyMessage}
            </Typography>
            <Typography variant="body2">Send a message to get started</Typography>
          </EmptyState>
        </MessageListContainer>
      );
    }

    const messageGroups = groupMessagesByDate(messages);
    const sortedDates = Object.keys(messageGroups).sort();

    return (
      <MessageListContainer>
        <MessagesScrollArea ref={scrollAreaRef}>
          {loading && hasMore && (
            <LoadingContainer>
              <Loader size={24} />
            </LoadingContainer>
          )}

          {sortedDates.map((date) => (
            <Stack key={date} spacing={0.5}>
              <DateDivider>
                <Divider />
                <DateLabel variant="caption">{formatDateLabel(date)}</DateLabel>
                <Divider />
              </DateDivider>

              {messageGroups[date].map((message) => (
                <MessageItem
                  key={message._id || message.id}
                  message={{
                    ...message,
                    isOwn: message.sender._id === currentUserId || message.sender.id === currentUserId,
                  }}
                />
              ))}
            </Stack>
          ))}
        </MessagesScrollArea>
      </MessageListContainer>
    );
  }
);

MessageList.displayName = 'MessageList';

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      content: PropTypes.string,
      sender: PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      attachments: PropTypes.array,
      readBy: PropTypes.array,
      createdAt: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  currentUserId: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  emptyMessage: PropTypes.string,
};

export default MessageList;
