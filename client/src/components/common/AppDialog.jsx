import { Close as CloseIcon } from '@mui/icons-material';
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

/**
 * Generic dialog component with consistent styling and behavior
 */
function AppDialog({
  open = false,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  error = null,
  loading = false,
  disableEscapeKeyDown = true, // Default to true to prevent ESC key closing
  disableBackdropClick = true, // Default to true to prevent backdrop click closing
  contentStyles = {},
  actionsStyles = {},
  ...rest
}) {
  const handleClose = (event, reason) => {
    if (loading) return;
    // Only allow closing via backdrop click if explicitly enabled
    if (reason === 'backdropClick' && disableBackdropClick) return;
    // Only allow closing via escape key if explicitly enabled
    if (reason === 'escapeKeyDown' && disableEscapeKeyDown) return;
    onClose?.(event, reason);
  };

  // Handle close button click directly
  const handleCloseButtonClick = () => {
    if (loading) return;
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="dialog-title"
      {...rest}
    >
      {title && (
        <DialogTitle
          id="dialog-title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}
        >
          {title}
          {showCloseButton && (
            <IconButton onClick={handleCloseButtonClick} disabled={loading} size="small" aria-label="Close dialog">
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent sx={{ p: 2, ...contentStyles }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {children}
      </DialogContent>

      {actions && <DialogActions sx={{ p: 2, gap: 1, ...actionsStyles }}>{actions}</DialogActions>}
    </Dialog>
  );
}

AppDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  contentStyles: PropTypes.object,
  actionsStyles: PropTypes.object,
};

export default memo(AppDialog);
