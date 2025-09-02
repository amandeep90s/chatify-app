import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { memo, useRef, useState } from 'react';

import { useLoading } from '@/hooks';

// Styled components
const MessageInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  flexShrink: 0, // Prevent the input from shrinking
  minHeight: '60px', // Ensure minimum height
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
    fontSize: '0.95rem',
    lineHeight: 1.4,
  },
}));

const AttachmentInput = styled('input')({
  display: 'none',
});

const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  rotate: '-30deg',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.action.disabled,
  },
}));

const MessageInput = memo(
  ({
    onSendMessage,
    onAttachFile,
    onEmojiClick,
    placeholder = 'Type a message...',
    disabled = false,
    maxLength = 1000,
  }) => {
    const [message, setMessage] = useState('');
    const { loading: sending, startLoading, stopLoading } = useLoading();
    const fileInputRef = useRef(null);

    const handleInputChange = (event) => {
      const value = event.target.value;
      if (value.length <= maxLength) {
        setMessage(value);
      }
    };

    const handleSendMessage = async () => {
      if (!message.trim() || sending || disabled) return;

      try {
        startLoading();
        await onSendMessage(message.trim());
        setMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        stopLoading();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage();
      }
    };

    const handleAttachClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files);
      if (files.length > 0 && onAttachFile) {
        onAttachFile(files);
      }
      // Reset the input
      event.target.value = '';
    };

    const canSend = message.trim().length > 0 && !sending && !disabled;

    return (
      <MessageInputContainer>
        <AttachmentInput
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
        />

        <IconButton
          onClick={handleAttachClick}
          disabled={disabled || sending}
          color="primary"
          size="small"
          aria-label="Attach file"
          sx={{ transform: 'rotate(30deg)' }}
        >
          <AttachFileIcon />
        </IconButton>

        <StyledTextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || sending}
          variant="outlined"
          slotProps={{
            input: {
              endAdornment: onEmojiClick && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={onEmojiClick}
                    disabled={disabled || sending}
                    size="small"
                    aria-label="Insert emoji"
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: { textAlign: 'right', margin: 0, fontSize: '0.75rem' },
            },
          }}
          helperText={`${message.length}/${maxLength}`}
        />

        <SendButton onClick={handleSendMessage} disabled={!canSend} size="small" aria-label="Send message">
          <SendIcon />
        </SendButton>
      </MessageInputContainer>
    );
  }
);

MessageInput.displayName = 'MessageInput';

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onAttachFile: PropTypes.func,
  onEmojiClick: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default MessageInput;
