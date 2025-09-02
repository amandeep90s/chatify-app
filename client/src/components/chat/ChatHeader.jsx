import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';

import AppAvatar from '@/components/common/AppAvatar';
import { truncateText } from '@/utils';

// Styled components
const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 70,
}));

const ChatInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(1.5),
  minWidth: 0, // Allow text truncation
}));

const ChatName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  lineHeight: 1.2,
  color: theme.palette.text.primary,
}));

const ChatStatus = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.2,
  marginTop: theme.spacing(0.25),
}));

const ActionButtons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return 'Last seen a while ago';

  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffInMinutes = Math.floor((now - lastSeenDate) / (1000 * 60));

  if (diffInMinutes < 1) return 'Online';
  if (diffInMinutes < 60) return `Last seen ${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Last seen ${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `Last seen ${diffInDays}d ago`;

  return 'Last seen a while ago';
};

const formatGroupStatus = (members, onlineCount) => {
  const totalMembers = members?.length || 0;
  const onlineMembers = onlineCount || 0;

  if (totalMembers === 0) return 'No members';
  if (totalMembers === 1) return '1 member';

  if (onlineMembers > 0) {
    return `${totalMembers} members, ${onlineMembers} online`;
  }

  return `${totalMembers} members`;
};

const ChatHeader = memo(
  ({
    chat,
    isGroup = false,
    onCallClick,
    onVideoCallClick,
    onSearchClick,
    onInfoClick,
    onDeleteChat,
    onBlockUser,
    onMuteChat,
    isMuted = false,
  }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const menuOpen = Boolean(menuAnchor);

    const handleMenuClick = (event) => {
      setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
      setMenuAnchor(null);
    };

    const handleMenuAction = (action) => {
      handleMenuClose();
      action();
    };

    const chatName = isGroup ? chat.name : chat.participants?.[0]?.name || 'Unknown User';
    const chatAvatar = isGroup ? chat.avatar : chat.participants?.[0]?.avatar;

    const statusText = isGroup
      ? formatGroupStatus(chat.participants, chat.onlineCount)
      : formatLastSeen(chat.participants?.[0]?.lastSeen);

    return (
      <HeaderContainer>
        <AppAvatar src={chatAvatar} name={chatName} size={45} onClick={onInfoClick} sx={{ cursor: 'pointer' }} />

        <ChatInfo onClick={onInfoClick} sx={{ cursor: 'pointer' }}>
          <ChatName>{truncateText(chatName, 25)}</ChatName>
          <ChatStatus>{statusText}</ChatStatus>
        </ChatInfo>

        <ActionButtons>
          {!isGroup && (
            <>
              <StyledIconButton onClick={onCallClick} aria-label="Voice call" size="small">
                <CallIcon />
              </StyledIconButton>

              <StyledIconButton onClick={onVideoCallClick} aria-label="Video call" size="small">
                <VideoCallIcon />
              </StyledIconButton>
            </>
          )}

          <StyledIconButton onClick={onSearchClick} aria-label="Search in chat" size="small">
            <SearchIcon />
          </StyledIconButton>

          <StyledIconButton onClick={handleMenuClick} aria-label="More options" size="small">
            <MoreVertIcon />
          </StyledIconButton>
        </ActionButtons>

        <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleMenuAction(onInfoClick)}>{isGroup ? 'Group Info' : 'Contact Info'}</MenuItem>

          <MenuItem onClick={() => handleMenuAction(onMuteChat)}>{isMuted ? 'Unmute' : 'Mute'} Chat</MenuItem>

          {!isGroup && <MenuItem onClick={() => handleMenuAction(onBlockUser)}>Block User</MenuItem>}

          <MenuItem onClick={() => handleMenuAction(onDeleteChat)} sx={{ color: 'error.main' }}>
            Delete Chat
          </MenuItem>
        </Menu>
      </HeaderContainer>
    );
  }
);

ChatHeader.displayName = 'ChatHeader';

ChatHeader.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        lastSeen: PropTypes.string,
      })
    ),
    onlineCount: PropTypes.number,
  }).isRequired,
  isGroup: PropTypes.bool,
  onCallClick: PropTypes.func,
  onVideoCallClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onInfoClick: PropTypes.func,
  onDeleteChat: PropTypes.func,
  onBlockUser: PropTypes.func,
  onMuteChat: PropTypes.func,
  isMuted: PropTypes.bool,
};

export default ChatHeader;
