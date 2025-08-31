import { Avatar, AvatarGroup, Badge, Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import { Link as LinkComponent } from 'react-router';

const Link = styled(LinkComponent)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    textDecoration: 'none',
  },
}));

const ChatItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  position: 'relative',
  backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
  color: isActive ? theme.palette.primary.dark : 'inherit',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

const ChatContent = styled(Stack)({
  flex: 1,
  minWidth: 0, // Allows text truncation
});

const ChatName = styled(Typography)({
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const MessageAlert = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  fontWeight: 400,
}));

const OnlineIndicator = styled(Box)(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  border: `2px solid ${theme.palette.background.paper}`,
  position: 'absolute',
  bottom: 0,
  right: 0,
}));

const StyledAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  fontSize: '1rem',
});

const StyledAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    fontSize: '0.875rem',
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

function ChatItem({
  avatar = [],
  name,
  id,
  groupChat = false,
  sameSender = false,
  isOnline = false,
  newMessageAlert = null,
  handleDeleteChat,
}) {
  const handleContextMenu = (e) => {
    if (handleDeleteChat) {
      handleDeleteChat(e, id, groupChat);
    }
  };

  const getAvatarComponent = () => {
    if (!avatar || avatar.length === 0) {
      return (
        <Box position="relative">
          <StyledAvatar>{name?.charAt(0)?.toUpperCase() || '?'}</StyledAvatar>
          {isOnline && <OnlineIndicator />}
        </Box>
      );
    }

    if (groupChat && avatar.length > 1) {
      return (
        <StyledAvatarGroup max={3}>
          {avatar.slice(0, 3).map((src, idx) => (
            <Avatar key={idx} src={src} alt={`Member ${idx + 1}`} />
          ))}
        </StyledAvatarGroup>
      );
    }

    return (
      <Box position="relative">
        <StyledAvatar src={avatar[0]} alt={name}>
          {!avatar[0] && (name?.charAt(0)?.toUpperCase() || '?')}
        </StyledAvatar>
        {isOnline && <OnlineIndicator />}
      </Box>
    );
  };

  const formatMessageCount = (count) => {
    if (count > 99) return '99+';
    return count.toString();
  };

  return (
    <Link
      to={`/chat/${id}`}
      onContextMenu={handleContextMenu}
      aria-label={`Chat with ${name}${newMessageAlert ? ` (${newMessageAlert.count} new messages)` : ''}`}
    >
      <ChatItemContainer isActive={sameSender}>
        {getAvatarComponent()}

        <ChatContent spacing={0.5}>
          <ChatName variant="body1" title={name}>
            {name}
          </ChatName>

          {newMessageAlert && newMessageAlert.count > 0 && (
            <MessageAlert variant="body2">
              {formatMessageCount(newMessageAlert.count)} new message{newMessageAlert.count !== 1 ? 's' : ''}
            </MessageAlert>
          )}
        </ChatContent>

        {newMessageAlert && newMessageAlert.count > 0 && (
          <Badge
            badgeContent={formatMessageCount(newMessageAlert.count)}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.625rem',
                minWidth: 20,
                height: 20,
              },
            }}
          />
        )}
      </ChatItemContainer>
    </Link>
  );
}

// Memoization with custom comparison for better performance
export default memo(ChatItem, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.name === nextProps.name &&
    prevProps.sameSender === nextProps.sameSender &&
    prevProps.isOnline === nextProps.isOnline &&
    prevProps.newMessageAlert?.count === nextProps.newMessageAlert?.count &&
    prevProps.groupChat === nextProps.groupChat &&
    JSON.stringify(prevProps.avatar) === JSON.stringify(nextProps.avatar)
  );
});
