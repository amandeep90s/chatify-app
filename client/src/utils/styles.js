/**
 * Common styled component mixins and themes
 */

export const commonStyles = {
  // Text truncation
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  // Multi-line text truncation
  textTruncateMultiline: (lines = 2) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  // Flex center
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Flex between
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Scrollbar styling
  customScrollbar: {
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },

  // Hover elevation effect
  hoverElevation: (theme) => ({
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      boxShadow: theme.shadows[2],
      transform: 'translateY(-1px)',
    },
  }),

  // Glass morphism effect
  glassMorphism: (theme) => ({
    background: `rgba(${theme.palette.background.paper}, 0.8)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(${theme.palette.divider}, 0.2)`,
  }),
};

export const buttonStyles = {
  primary: (theme) => ({
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': { bgcolor: theme.palette.primary.dark },
    '&:disabled': { bgcolor: theme.palette.grey[300] },
  }),

  secondary: (theme) => ({
    bgcolor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': { bgcolor: theme.palette.secondary.dark },
    '&:disabled': { bgcolor: theme.palette.grey[300] },
  }),

  success: (theme) => ({
    bgcolor: theme.palette.success.main,
    color: 'white',
    '&:hover': { bgcolor: theme.palette.success.dark },
    '&:disabled': { bgcolor: theme.palette.grey[300] },
  }),

  error: (theme) => ({
    bgcolor: theme.palette.error.main,
    color: 'white',
    '&:hover': { bgcolor: theme.palette.error.dark },
    '&:disabled': { bgcolor: theme.palette.grey[300] },
  }),
};
