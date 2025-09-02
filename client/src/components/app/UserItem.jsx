import { Add as AddIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
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
  bgcolor: 'primary.main',
  color: 'white',
  '&:hover': { bgcolor: 'primary.dark' },
  '&:disabled': { bgcolor: 'grey.300' },
};

function UserItem({ user, handler, isLoading = false }) {
  const { _id, id, name, avatar } = user;
  const [avatarError, setAvatarError] = useState(false);

  // Use _id as fallback for id (common in MongoDB)
  const userId = id || _id;

  const handleClick = useCallback(() => {
    if (!isLoading && handler) {
      handler(userId);
    }
  }, [userId, handler, isLoading]);

  const handleAvatarError = useCallback(() => {
    setAvatarError(true);
  }, []);

  return (
    <ListItem sx={{ py: 1 }} role="listitem" aria-label={`User ${name}`}>
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
          title={name} // Tooltip for truncated text
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={buttonStyles}
          onClick={handleClick}
          disabled={isLoading}
          aria-label={`Add ${name} to chat`}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
}

// Custom comparison function for better memoization
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.user._id === nextProps.user._id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.avatar === nextProps.user.avatar &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.handler === nextProps.handler
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  handler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default memo(UserItem, areEqual);
