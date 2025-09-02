import { createTheme } from '@mui/material/styles';

// LinkedIn Color Palette
const linkedinColors = {
  // Primary LinkedIn Blue
  primary: {
    main: '#0A66C2', // LinkedIn primary blue
    light: '#378FE9',
    dark: '#004182',
    contrastText: '#FFFFFF',
  },

  // Secondary colors
  secondary: {
    main: '#70B5F9', // LinkedIn light blue
    light: '#9BCBF5',
    dark: '#378FE9',
    contrastText: '#FFFFFF',
  },

  // Background colors
  background: {
    default: '#F4F2EE', // LinkedIn's warm off-white
    paper: '#FFFFFF', // White for cards/papers
    chat: '#F8F9FA', // Chat background (very light gray)
    sidebar: '#FFFFFF', // Sidebar background
    login: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)', // Login gradient
    accent: '#F3F2EF', // LinkedIn's accent background
  },

  // Text colors
  text: {
    primary: '#000000', // Black text (LinkedIn uses true black)
    secondary: '#666666', // Gray text
    disabled: '#949494', // Disabled text
    hint: '#666666',
  },

  // Additional LinkedIn specific colors
  linkedin: {
    // Message bubbles
    outgoing: '#0A66C2', // LinkedIn blue for sent messages
    incoming: '#F3F2EF', // Light gray for received messages
    outgoingText: '#FFFFFF', // White text for sent messages
    incomingText: '#000000', // Black text for received messages

    // Status colors
    online: '#57C778', // LinkedIn's green for online status
    typing: '#0A66C2',
    delivered: '#70B5F9',
    read: '#57C778',

    // UI elements
    divider: '#E8E8E8',
    hover: '#F3F2EF',
    border: '#CCCCCC',

    // Accent colors
    success: '#057642', // LinkedIn's success green
    warning: '#A67C00', // LinkedIn's warning amber
    error: '#CC1016', // LinkedIn's error red
    premium: '#C37D16', // LinkedIn Premium gold

    // Additional LinkedIn colors
    gray100: '#F9F9F9',
    gray200: '#F3F2EF',
    gray300: '#E8E8E8',
    gray400: '#CCCCCC',
    gray500: '#949494',
    gray600: '#666666',
    gray700: '#4D4D4D',
    gray800: '#333333',
    gray900: '#1A1A1A',
  },
};

// Create the LinkedIn theme
const linkedinTheme = createTheme({
  palette: {
    primary: linkedinColors.primary,
    secondary: linkedinColors.secondary,
    background: {
      default: linkedinColors.background.default,
      paper: linkedinColors.background.paper,
      login: linkedinColors.background.login,
    },
    text: linkedinColors.text,
    divider: linkedinColors.linkedin.divider,

    // Success, warning, error colors
    success: {
      main: linkedinColors.linkedin.success,
      light: '#4CAF50',
      dark: '#2E7D32',
    },
    warning: {
      main: linkedinColors.linkedin.warning,
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: linkedinColors.linkedin.error,
      light: '#E57373',
      dark: '#D32F2F',
    },

    // Custom colors accessible via theme.palette.linkedin
    linkedin: linkedinColors.linkedin,
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Ubuntu',
      'sans-serif',
    ].join(','),

    // LinkedIn-style typography
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
      color: linkedinColors.text.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.25,
      color: linkedinColors.text.primary,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: linkedinColors.text.primary,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.35,
      color: linkedinColors.text.primary,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: linkedinColors.text.primary,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: linkedinColors.text.primary,
    },
    body1: {
      fontSize: '14px',
      lineHeight: 1.5,
      color: linkedinColors.text.primary,
    },
    body2: {
      fontSize: '12px',
      lineHeight: 1.5,
      color: linkedinColors.text.secondary,
    },
    caption: {
      fontSize: '12px',
      lineHeight: 1.33,
      color: linkedinColors.text.secondary,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 4, // LinkedIn's more subtle border radius
  },

  components: {
    // Customize MUI components to match LinkedIn style
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '24px', // LinkedIn's rounded buttons
          fontWeight: 600,
          fontSize: '16px',
          padding: '8px 24px',
          minHeight: '32px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.15)',
          },
          '&:disabled': {
            backgroundColor: linkedinColors.linkedin.gray300,
            color: linkedinColors.linkedin.gray500,
          },
        },
        outlined: {
          borderColor: linkedinColors.primary.main,
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
            backgroundColor: 'rgba(10, 102, 194, 0.05)',
          },
        },
        text: {
          color: linkedinColors.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(10, 102, 194, 0.05)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            backgroundColor: linkedinColors.background.paper,
            border: `1px solid ${linkedinColors.linkedin.border}`,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: linkedinColors.linkedin.gray600,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: linkedinColors.primary.main,
              borderWidth: '2px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: linkedinColors.linkedin.border,
            },
          },
          '& .MuiInputLabel-outlined': {
            color: linkedinColors.text.secondary,
            '&.Mui-focused': {
              color: linkedinColors.primary.main,
            },
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: linkedinColors.primary.main,
          color: linkedinColors.primary.contrastText,
          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.15)',
          border: `1px solid ${linkedinColors.linkedin.gray300}`,
        },
        elevation1: {
          boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.15)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.15)',
          border: `1px solid ${linkedinColors.linkedin.gray300}`,
          backgroundColor: linkedinColors.background.paper,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: linkedinColors.text.secondary,
          padding: '8px',
          '&:hover': {
            backgroundColor: linkedinColors.linkedin.hover,
            color: linkedinColors.primary.main,
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: linkedinColors.linkedin.divider,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: linkedinColors.background.paper,
          color: linkedinColors.text.primary,
          boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.15)',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: 500,
        },
        filled: {
          backgroundColor: linkedinColors.linkedin.gray200,
          color: linkedinColors.text.primary,
          '&:hover': {
            backgroundColor: linkedinColors.linkedin.gray300,
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: linkedinColors.linkedin.hover,
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          '&:hover': {
            backgroundColor: linkedinColors.linkedin.hover,
          },
          '&.Mui-selected': {
            backgroundColor: linkedinColors.linkedin.gray200,
            '&:hover': {
              backgroundColor: linkedinColors.linkedin.gray300,
            },
          },
        },
      },
    },
  },
});

export default linkedinTheme;
