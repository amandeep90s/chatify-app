// Playful Rainbow Vibes Color Palette (Kid-Friendly)
export const kidsColors = {
  // Primary UFO Green
  primaryGreen: '#35D461', // UFO Green for main elements (buttons, online status)
  primaryGreenLight: '#66E88A',
  primaryGreenDark: '#249945',

  // Secondary colors
  secondaryYellow: '#F9E104', // Vivid Yellow for accents, highlights
  lightYellow: '#FFEE4D',

  // Status colors
  successGreen: '#35D461', // UFO Green for success/online
  warningOrange: '#F99D07', // RYB Orange for warnings
  errorViolet: '#882FF6', // Blue-Violet for errors
  accentBlue: '#37B6F6', // Picton Blue for accents (e.g., typing status)
  onlineGreen: '#35D461', // UFO Green for online status

  // Background colors
  backgroundDefault: '#E6F7FF', // Light Picton Blue-based for main background
  backgroundPaper: '#FFFFFF', // White for cards/papers
  backgroundAccent: '#F0E4FF', // Light Blue-Violet for highlights
  backgroundChat: '#F0FBFF', // Very light blue for chat area

  // Gray scale (kept neutral for balance)
  gray100: '#F8F9FA',
  gray200: '#F1F3F4',
  gray300: '#E8ECEF',
  gray400: '#B0B3B8',
  gray500: '#9AA0A6',
  gray600: '#5F6368',
  gray700: '#444746',
  gray800: '#3C4043',
  gray900: '#202124',

  // Text colors
  textPrimary: '#1A1A1A', // Near-black for readability
  textSecondary: '#4A4A4A', // Softer grey for secondary text
  textDisabled: '#9AA0A6',

  // UI elements
  divider: '#DADCE0',
  hover: '#F0FBFF', // Light blue hover
  border: '#B0B3B8',
};

// Export individual color groups for easy access
export const backgrounds = {
  default: kidsColors.backgroundDefault,
  paper: kidsColors.backgroundPaper,
  accent: kidsColors.backgroundAccent,
  chat: kidsColors.backgroundChat,
};

export const text = {
  primary: kidsColors.textPrimary,
  secondary: kidsColors.textSecondary,
  disabled: kidsColors.textDisabled,
};

export const status = {
  success: kidsColors.successGreen,
  warning: kidsColors.warningOrange,
  error: kidsColors.errorViolet,
  online: kidsColors.onlineGreen,
  accent: kidsColors.accentBlue,
};

export const grays = {
  100: kidsColors.gray100,
  200: kidsColors.gray200,
  300: kidsColors.gray300,
  400: kidsColors.gray400,
  500: kidsColors.gray500,
  600: kidsColors.gray600,
  700: kidsColors.gray700,
  800: kidsColors.gray800,
  900: kidsColors.gray900,
};

export default kidsColors;
