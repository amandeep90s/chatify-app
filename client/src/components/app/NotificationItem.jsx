import { Avatar, Button, CircularProgress, ListItem, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';

// Optimized styles to prevent recreation on each render
const textStyles = {
  flexGrow: 1,
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
};

const buttonStyles = {
  minWidth: 80,
  height: 32,
  fontSize: '0.875rem',
};

const acceptButtonStyles = {
  ...buttonStyles,
  bgcolor: 'success.main',
  color: 'white',
  '&:hover': { bgcolor: 'success.dark' },
  '&:disabled': { bgcolor: 'grey.300' },
};

const declineButtonStyles = {
  ...buttonStyles,
  bgcolor: 'error.main',
  color: 'white',
  '&:hover': { bgcolor: 'error.dark' },
  '&:disabled': { bgcolor: 'grey.300' },
};

function NotificationItem({ notification, handler, isLoading = false }) {
  const { _id, sender, type = 'friend_request', message } = notification;
  const { name, avatar } = sender;

  const [avatarError, setAvatarError] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // 'accept' | 'decline' | null

  const handleAvatarError = useCallback(() => {
    setAvatarError(true);
  }, []);

  const handleAction = useCallback(
    async (action) => {
      if (actionLoading || isLoading || !handler) return;

      setActionLoading(action);
      try {
        await handler(_id, action === 'accept');
      } catch (error) {
        console.error('Failed to handle notification action:', error);
      } finally {
        setActionLoading(null);
      }
    },
    [_id, handler, actionLoading, isLoading]
  );

  const handleAccept = useCallback(() => handleAction('accept'), [handleAction]);
  const handleDecline = useCallback(() => handleAction('decline'), [handleAction]);

  // Generate notification message based on type
  const getNotificationMessage = () => {
    if (message) return message;

    switch (type) {
      case 'friend_request':
        return `${name} sent you a friend request`;
      case 'group_invite':
        return `${name} invited you to a group`;
      case 'message':
        return `${name} sent you a message`;
      default:
        return `${name} sent you a notification`;
    }
  };

  const isActionDisabled = actionLoading || isLoading;

  return (
    <ListItem sx={{ py: 1 }} role="listitem" aria-label={`Notification from ${name}`}>
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Avatar
          src={avatarError ? undefined : avatar}
          alt={`${name}'s avatar`}
          onError={handleAvatarError}
          sx={{ width: 40, height: 40 }}
        >
          {!avatar || avatarError ? name?.charAt(0)?.toUpperCase() : null}
        </Avatar>

        <Typography
          variant="body1"
          component="span"
          sx={textStyles}
          title={getNotificationMessage()} // Tooltip for truncated text
        >
          {getNotificationMessage()}
        </Typography>

        {type === 'friend_request' && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button
              sx={acceptButtonStyles}
              onClick={handleAccept}
              disabled={isActionDisabled}
              aria-label={`Accept friend request from ${name}`}
              startIcon={actionLoading === 'accept' ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {actionLoading === 'accept' ? 'Accepting...' : 'Accept'}
            </Button>
            <Button
              sx={declineButtonStyles}
              onClick={handleDecline}
              disabled={isActionDisabled}
              aria-label={`Decline friend request from ${name}`}
              startIcon={actionLoading === 'decline' ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {actionLoading === 'decline' ? 'Declining...' : 'Decline'}
            </Button>
          </Stack>
        )}
      </Stack>
    </ListItem>
  );
}

// Custom comparison function for better memoization
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.notification._id === nextProps.notification._id &&
    prevProps.notification.sender.name === nextProps.notification.sender.name &&
    prevProps.notification.sender.avatar === nextProps.notification.sender.avatar &&
    prevProps.notification.type === nextProps.notification.type &&
    prevProps.notification.message === nextProps.notification.message &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.handler === nextProps.handler
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    type: PropTypes.oneOf(['friend_request', 'group_invite', 'message']),
    message: PropTypes.string,
  }).isRequired,
  handler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default memo(NotificationItem, areEqual);
