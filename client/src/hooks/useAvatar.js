import { useCallback, useState } from 'react';

/**
 * Avatar error handling hook for fallback to initials
 * @param {string} name - User's name for fallback
 * @param {string} avatar - Avatar URL
 * @returns {object} - Avatar state and handlers
 */
export const useAvatar = (name, avatar) => {
  const [avatarError, setAvatarError] = useState(false);

  const handleAvatarError = useCallback(() => {
    setAvatarError(true);
  }, []);

  const resetAvatarError = useCallback(() => {
    setAvatarError(false);
  }, []);

  const getDisplayAvatar = useCallback(() => {
    if (avatarError || !avatar) {
      return {
        src: undefined,
        children: name?.charAt(0)?.toUpperCase() || '?',
      };
    }
    return {
      src: avatar,
      children: null,
    };
  }, [avatar, avatarError, name]);

  return {
    avatarError,
    handleAvatarError,
    resetAvatarError,
    getDisplayAvatar,
  };
};
