import { Button, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

/**
 * Generic loading button component
 */
function LoadingButton({
  loading = false,
  loadingText,
  children,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  sx = {},
  ...rest
}) {
  const isDisabled = disabled || loading;
  const buttonText = loading && loadingText ? loadingText : children;
  const loadingIcon = loading ? <CircularProgress size={16} color="inherit" /> : null;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      startIcon={loading ? loadingIcon : startIcon}
      endIcon={!loading ? endIcon : null}
      sx={sx}
      {...rest}
    >
      {buttonText}
    </Button>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  sx: PropTypes.object,
};

export default memo(LoadingButton);
