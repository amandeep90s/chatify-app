import { Box, CircularProgress, List, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';

import AppDialog from '@/components/common/AppDialog';
import { sampleNotifications } from '@/constants/sampleData';

import NotificationItem from './NotificationItem';

function Notifications({ open = false, onClose, isLoading = false }) {
  const [handlingNotifications, setHandlingNotifications] = useState(new Set());

  const handleClose = useCallback(() => {
    if (onClose && !isLoading) {
      onClose();
    }
  }, [onClose, isLoading]);

  const handleFriendRequest = useCallback(
    async (notificationId, isAccepted) => {
      if (handlingNotifications.has(notificationId)) return;

      setHandlingNotifications((prev) => new Set(prev).add(notificationId));

      try {
        console.log('Handle friend request for ID:', notificationId, 'Accepted:', isAccepted);

        // TODO: Implement actual API call
        // await api.handleFriendRequest(notificationId, isAccepted);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Update notifications list or remove handled notification
        // This could involve updating the parent component's state
      } catch (error) {
        console.error('Failed to handle friend request:', error);
        // TODO: Show error toast/snackbar
      } finally {
        setHandlingNotifications((prev) => {
          const newSet = new Set(prev);
          newSet.delete(notificationId);
          return newSet;
        });
      }
    },
    [handlingNotifications]
  );

  // Optimize rendering for notification items
  const renderNotificationItem = useCallback(
    (notification) => (
      <NotificationItem
        key={notification._id}
        notification={notification}
        handler={handleFriendRequest}
        isLoading={handlingNotifications.has(notification._id) || isLoading}
      />
    ),
    [handleFriendRequest, handlingNotifications, isLoading]
  );

  const dialogContent = (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {sampleNotifications.length > 0 ? (
            <List
              sx={{
                maxHeight: 400,
                overflow: 'auto',
                py: 0,
                '&::-webkit-scrollbar': {
                  width: 8,
                },
                '&::-webkit-scrollbar-track': {
                  background: (theme) => theme.palette.kids?.gray200 || '#f1f1f1',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: (theme) => theme.palette.kids?.gray500 || '#888',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: (theme) => theme.palette.kids?.gray600 || '#555',
                },
              }}
              role="list"
              aria-label="Notifications list"
            >
              {sampleNotifications.map(renderNotificationItem)}
            </List>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight={200}
              textAlign="center"
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You're all caught up! No new notifications to show.
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );

  return (
    <AppDialog open={open} onClose={handleClose} title="Notifications" loading={isLoading}>
      {dialogContent}
    </AppDialog>
  );
}

Notifications.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default memo(Notifications);
