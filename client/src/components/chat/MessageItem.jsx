import {
  AudioFile as AudioIcon,
  Download as DownloadIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';
import { Box, Card, CardMedia, Chip, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';

import AppAvatar from '@/components/common/AppAvatar';
import { formatFileSize, truncateText } from '@/utils';

// Styled components
const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})(({ theme, isOwn }) => ({
  display: 'flex',
  flexDirection: isOwn ? 'row-reverse' : 'row',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0, 1),
}));

const MessageBubble = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})(({ theme, isOwn }) => ({
  maxWidth: '70%',
  minWidth: '120px',
  padding: theme.spacing(1, 1.5),
  backgroundColor: isOwn
    ? theme.palette.linkedin?.outgoing || theme.palette.primary.main
    : theme.palette.linkedin?.incoming || theme.palette.background.paper,
  color: isOwn
    ? theme.palette.linkedin?.outgoingText || theme.palette.primary.contrastText
    : theme.palette.linkedin?.incomingText || theme.palette.text.primary,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    [isOwn ? 'right' : 'left']: -8,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: isOwn ? '8px 0 0 8px' : '8px 8px 0 0',
    borderColor: isOwn
      ? `transparent transparent transparent ${theme.palette.linkedin?.outgoing || theme.palette.primary.main}`
      : `transparent ${theme.palette.linkedin?.incoming || theme.palette.background.paper} transparent transparent`,
  },
}));

const MessageContent = styled(Typography)(() => ({
  color: 'inherit',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
}));

const MessageTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  opacity: 0.7,
  marginTop: theme.spacing(0.5),
  textAlign: 'right',
}));

const AttachmentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));

const FileAttachment = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color']),
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const ReadStatus = styled(Chip)(({ theme }) => ({
  height: 16,
  fontSize: '0.6rem',
  '& .MuiChip-label': {
    padding: theme.spacing(0, 0.5),
  },
}));

function MessageItem({ message, showAvatar = true, showSenderName = false }) {
  const { sender, content, attachments, readBy, createdAt, isOwn } = message;
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleFileDownload = useCallback((attachment) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <ImageIcon />;
      case 'video':
        return <VideoIcon />;
      case 'audio':
        return <AudioIcon />;
      default:
        return <FileIcon />;
    }
  };

  const formatTime = (date) => {
    const now = dayjs();
    const messageDate = dayjs(date);

    if (now.diff(messageDate, 'day') === 0) {
      return messageDate.format('HH:mm');
    } else if (now.diff(messageDate, 'day') === 1) {
      return 'Yesterday ' + messageDate.format('HH:mm');
    } else {
      return messageDate.format('MMM DD, HH:mm');
    }
  };

  const renderAttachment = (attachment, index) => {
    if (attachment.type === 'image') {
      return (
        <AttachmentContainer key={index}>
          <CardMedia
            component="img"
            image={imageError ? '/placeholder-image.png' : attachment.url}
            alt={attachment.name}
            onError={handleImageError}
            sx={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'contain',
              cursor: 'pointer',
              borderRadius: 1,
            }}
            onClick={() => window.open(attachment.url, '_blank')}
          />
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
            {attachment.name}
          </Typography>
        </AttachmentContainer>
      );
    }

    return (
      <AttachmentContainer key={index}>
        <FileAttachment onClick={() => handleFileDownload(attachment)}>
          {getFileIcon(attachment.type)}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {truncateText(attachment.name, 30)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatFileSize(attachment.size)}
            </Typography>
          </Box>
          <IconButton size="small" color="primary">
            <DownloadIcon />
          </IconButton>
        </FileAttachment>
      </AttachmentContainer>
    );
  };

  return (
    <MessageContainer isOwn={isOwn}>
      {/* Avatar (only show for non-own messages and when enabled) */}
      {!isOwn && showAvatar && <AppAvatar src={sender.avatar} name={sender.name} size={32} />}

      {/* Message bubble */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
        {/* Sender name (for group chats) */}
        {!isOwn && showSenderName && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, px: 1 }}>
            {sender.name}
          </Typography>
        )}

        <MessageBubble isOwn={isOwn} elevation={1}>
          {/* Message content */}
          {content && <MessageContent variant="body2">{content}</MessageContent>}

          {/* Attachments */}
          {attachments && attachments.length > 0 && (
            <Box sx={{ mt: content ? 1 : 0 }}>{attachments.map(renderAttachment)}</Box>
          )}

          {/* Message metadata */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 0.5 }}>
            <MessageTime variant="caption">{formatTime(createdAt)}</MessageTime>

            {/* Read status */}
            {isOwn && (
              <ReadStatus
                size="small"
                label={readBy.length > 0 ? 'Read' : 'Sent'}
                color={readBy.length > 0 ? 'success' : 'default'}
                variant="outlined"
              />
            )}
          </Stack>
        </MessageBubble>
      </Box>
    </MessageContainer>
  );
}

MessageItem.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    content: PropTypes.string,
    messageType: PropTypes.string,
    attachments: PropTypes.array,
    readBy: PropTypes.array,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    isOwn: PropTypes.bool,
  }).isRequired,
  showAvatar: PropTypes.bool,
  showSenderName: PropTypes.bool,
};

export default memo(MessageItem);
