import { createTheme } from '@mui/material/styles';

// Playful Rainbow Vibes Color Palette (Kid-Friendly)
const rainbowColors = {
  // Primary UFO Green
  primary: {
    main: '#35D461', // UFO Green for buttons, online status
    light: '#66E88A',
    dark: '#249945',
    contrastText: '#FFFFFF',
  },

  // Secondary Vivid Yellow
  secondary: {
    main: '#F9E104', // Vivid Yellow for accents, highlights
    light: '#FFEE4D',
    dark: '#B0A003',
    contrastText: '#000000',
  },

  // Background colors
  background: {
    default: '#E6F7FF', // Light Picton Blue-based for main background
    paper: '#FFFFFF', // White for cards/papers
    chat: '#F0FBFF', // Very light blue for chat area
    sidebar: '#FFFFFF', // White sidebar
    login: 'linear-gradient(135deg, #35D461 0%, #249945 100%)', // Green gradient for login
    accent: '#F0E4FF', // Light Blue-Violet for highlights
  },

  // Text colors
  text: {
    primary: '#1A1A1A', // Near-black for readability
    secondary: '#4A4A4A', // Softer grey for secondary text
    disabled: '#9AA0A6',
    hint: '#4A4A4A',
  },

  // Additional kid-friendly colors
  kids: {
    // Message bubbles
    outgoing: '#35D461', // UFO Green for sent messages
    incoming: '#F0E4FF', // Light Blue-Violet for received messages
    outgoingText: '#FFFFFF', // White text for sent messages
    incomingText: '#1A1A1A', // Dark text for received messages

    // Status colors
    online: '#35D461', // UFO Green for online status
    typing: '#37B6F6', // Picton Blue for typing
    delivered: '#F9E104', // Vivid Yellow for delivered
    read: '#35D461', // UFO Green for read

    // UI elements
    divider: '#DADCE0',
    hover: '#F0FBFF', // Light blue hover
    border: '#B0B3B8',

    // Accent colors
    success: '#35D461', // UFO Green for success
    warning: '#F99D07', // RYB Orange for warnings
    error: '#882FF6', // Blue-Violet for errors
    accent: '#37B6F6', // Picton Blue for accents

    // Additional grey shades for balance
    grey50: '#F8F9FA',
    grey100: '#F1F3F4',
    grey200: '#E8ECEF',
    grey300: '#DADCE0',
    grey400: '#B0B3B8',
    grey500: '#9AA0A6',
    grey600: '#5F6368',
    grey700: '#444746',
    grey800: '#3C4043',
    grey900: '#202124',
  },
};

// Create the Playful Rainbow Vibes theme
const rainbowTheme = createTheme({
  palette: {
    primary: rainbowColors.primary,
    secondary: rainbowColors.secondary,
    background: {
      default: rainbowColors.background.default,
      paper: rainbowColors.background.paper,
      login: rainbowColors.background.login,
    },
    text: rainbowColors.text,
    divider: rainbowColors.kids.divider,

    // Success, warning, error colors
    success: {
      main: rainbowColors.kids.success,
      light: '#66E88A',
      dark: '#249945',
    },
    warning: {
      main: rainbowColors.kids.warning,
      light: '#FFC107',
      dark: '#C77C02',
    },
    error: {
      main: rainbowColors.kids.error,
      light: '#A66EFF',
      dark: '#6B23C6',
    },

    // Custom colors accessible via theme.palette.kids
    kids: rainbowColors.kids,
  },

  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),

    // Kid-friendly typography (clear, slightly larger for readability)
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
      color: rainbowColors.text.primary,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.25,
      color: rainbowColors.text.primary,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: rainbowColors.text.primary,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.35,
      color: rainbowColors.text.primary,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.4,
      color: rainbowColors.text.primary,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: rainbowColors.text.primary,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1.1rem', // Slightly larger for kids
      fontWeight: 400,
      lineHeight: 1.5,
      color: rainbowColors.text.primary,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.95rem',
      fontWeight: 400,
      lineHeight: 1.43,
      color: rainbowColors.text.secondary,
      letterSpacing: '0.01071em',
    },
    caption: {
      fontSize: '0.8rem',
      fontWeight: 400,
      lineHeight: 1.66,
      color: rainbowColors.text.secondary,
      letterSpacing: '0.03333em',
    },
    button: {
      fontSize: '0.95rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 12, // Softer, rounded corners for a kid-friendly feel
  },

  components: {
    // Customize MUI components for a playful, kid-friendly look
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px', // Rounded buttons for kids
          fontWeight: 500,
          fontSize: '1rem',
          padding: '10px 18px',
          minHeight: '40px', // Larger buttons for easy tapping
          letterSpacing: '0.02857em',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.15)',
            backgroundColor: rainbowColors.primary.light,
          },
          '&:disabled': {
            backgroundColor: rainbowColors.kids.grey300,
            color: rainbowColors.kids.grey500,
          },
        },
        outlined: {
          borderColor: rainbowColors.kids.border,
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: rainbowColors.kids.grey100,
          },
        },
        text: {
          color: rainbowColors.primary.main,
          '&:hover': {
            backgroundColor: rainbowColors.kids.grey100,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: rainbowColors.background.paper,
            border: `1px solid ${rainbowColors.kids.border}`,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: rainbowColors.kids.grey600,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: rainbowColors.primary.main,
              borderWidth: '2px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: rainbowColors.kids.border,
            },
          },
          '& .MuiInputLabel-outlined': {
            color: rainbowColors.text.secondary,
            '&.Mui-focused': {
              color: rainbowColors.primary.main,
            },
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: rainbowColors.primary.main,
          color: rainbowColors.primary.contrastText,
          fontWeight: 500,
          fontSize: '1.2rem', // Slightly larger for kids
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
          border: `1px solid ${rainbowColors.kids.grey300}`,
          backgroundColor: rainbowColors.background.paper,
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
          border: `1px solid ${rainbowColors.kids.grey300}`,
          backgroundColor: rainbowColors.background.paper,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: rainbowColors.text.secondary,
          padding: '12px',
          '&:hover': {
            backgroundColor: rainbowColors.kids.grey100,
            color: rainbowColors.primary.main,
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: rainbowColors.kids.divider,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: rainbowColors.background.paper,
          color: rainbowColors.text.primary,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontSize: '0.9rem',
          fontWeight: 400,
          height: '36px', // Slightly larger for kids
        },
        filled: {
          backgroundColor: rainbowColors.kids.grey200,
          color: rainbowColors.text.primary,
          '&:hover': {
            backgroundColor: rainbowColors.kids.grey300,
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          padding: '8px 0',
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: rainbowColors.kids.grey100,
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.95rem',
          '&:hover': {
            backgroundColor: rainbowColors.kids.grey100,
          },
          '&.Mui-selected': {
            backgroundColor: rainbowColors.kids.grey200,
            '&:hover': {
              backgroundColor: rainbowColors.kids.grey300,
            },
          },
        },
      },
    },
  },
});

export default rainbowTheme;
