import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

import { useAvatar } from '@/hooks';

/**
 * Generic avatar component with error handling and fallback
 */
function AppAvatar({ src, alt, name, size = 40, sx = {}, children, onClick, ...rest }) {
  const { handleAvatarError, getDisplayAvatar } = useAvatar(name, src);
  const displayAvatar = getDisplayAvatar();

  const avatarStyles = {
    width: size,
    height: size,
    fontSize: size > 32 ? '1rem' : '0.875rem',
    cursor: onClick ? 'pointer' : 'default',
    ...sx,
  };

  return (
    <Avatar
      src={displayAvatar.src}
      alt={alt || `${name}'s avatar`}
      onError={handleAvatarError}
      onClick={onClick}
      sx={avatarStyles}
      {...rest}
    >
      {children || displayAvatar.children}
    </Avatar>
  );
}

AppAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  sx: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default memo(AppAvatar);
