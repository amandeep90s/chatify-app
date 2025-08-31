import { createTheme } from '@mui/material/styles';

// WhatsApp Color Palette (Light Mode Only)
const whatsappColors = {
  // Primary WhatsApp Green
  primary: {
    main: '#25D366', // WhatsApp green
    light: '#4AE986',
    dark: '#1AA750',
    contrastText: '#FFFFFF',
  },

  // Secondary Dark Green
  secondary: {
    main: '#128C7E', // WhatsApp dark green
    light: '#34A394',
    dark: '#0D5D56',
    contrastText: '#FFFFFF',
  },

  // Background colors
  background: {
    default: '#F7F8FA', // Light gray background
    paper: '#FFFFFF', // White for cards/papers
    chat: '#E5DDD5', // Chat background (light beige)
    sidebar: '#F0F2F5', // Sidebar background
    login: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', // Login gradient
  },

  // Text colors
  text: {
    primary: '#111B21', // Dark text
    secondary: '#667781', // Gray text
    disabled: '#8696A0', // Disabled text
    hint: '#8696A0',
  },

  // Additional WhatsApp specific colors
  whatsapp: {
    // Message bubbles
    outgoing: '#D9FDD3', // Light green for sent messages
    incoming: '#FFFFFF', // White for received messages

    // Status colors
    online: '#25D366',
    typing: '#25D366',
    delivered: '#4FC3F7',
    read: '#4FC3F7',

    // UI elements
    divider: '#E9EDEF',
    hover: '#F5F6F6',

    // Accent colors
    blue: '#53BDEB', // Links and accents
    orange: '#FF9800', // Warnings
    red: '#F44336', // Errors/delete
  },
};

// Create the WhatsApp theme
const whatsappTheme = createTheme({
  palette: {
    primary: whatsappColors.primary,
    secondary: whatsappColors.secondary,
    background: {
      default: whatsappColors.background.default,
      paper: whatsappColors.background.paper,
      login: whatsappColors.background.login,
    },
    text: whatsappColors.text,
    divider: whatsappColors.whatsapp.divider,

    // Custom colors accessible via theme.palette.whatsapp
    whatsapp: whatsappColors.whatsapp,
  },

  typography: {
    fontFamily: ['IBM Plex Sans', 'Arial', 'sans-serif'].join(','),

    // Custom typography variants for WhatsApp-like text
    body1: {
      fontSize: '14px',
      lineHeight: 1.43,
    },
    body2: {
      fontSize: '13px',
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '12px',
      lineHeight: 1.33,
      color: whatsappColors.text.secondary,
    },
  },

  shape: {
    borderRadius: 8, // WhatsApp-like rounded corners
  },

  components: {
    // Customize MUI components to match WhatsApp style
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase transformation
          borderRadius: '8px', // Rounded buttons
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: whatsappColors.background.paper,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: whatsappColors.primary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: whatsappColors.primary.main,
              borderWidth: '2px',
            },
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: whatsappColors.secondary.main,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: whatsappColors.text.secondary,
          '&:hover': {
            backgroundColor: whatsappColors.whatsapp.hover,
            color: whatsappColors.primary.main,
          },
        },
      },
    },
  },
});

export default whatsappTheme;
