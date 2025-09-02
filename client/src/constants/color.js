// LinkedIn Color Palette
export const linkedinColors = {
  // Primary LinkedIn Blue
  primaryBlue: '#0A66C2',
  primaryBlueLight: '#378FE9',
  primaryBlueDark: '#004182',

  // Secondary colors
  secondaryBlue: '#70B5F9',
  lightBlue: '#9BCBF5',

  // Status colors
  successGreen: '#057642',
  warningAmber: '#A67C00',
  errorRed: '#CC1016',
  premiumGold: '#C37D16',
  onlineGreen: '#57C778',

  // Background colors
  backgroundDefault: '#F4F2EE',
  backgroundPaper: '#FFFFFF',
  backgroundAccent: '#F3F2EF',
  backgroundChat: '#F8F9FA',

  // Gray scale
  gray100: '#F9F9F9',
  gray200: '#F3F2EF',
  gray300: '#E8E8E8',
  gray400: '#CCCCCC',
  gray500: '#949494',
  gray600: '#666666',
  gray700: '#4D4D4D',
  gray800: '#333333',
  gray900: '#1A1A1A',

  // Text colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textDisabled: '#949494',

  // UI elements
  divider: '#E8E8E8',
  hover: '#F3F2EF',
  border: '#CCCCCC',
};

// Export individual color groups for easy access
export const backgrounds = {
  default: linkedinColors.backgroundDefault,
  paper: linkedinColors.backgroundPaper,
  accent: linkedinColors.backgroundAccent,
  chat: linkedinColors.backgroundChat,
};

export const text = {
  primary: linkedinColors.textPrimary,
  secondary: linkedinColors.textSecondary,
  disabled: linkedinColors.textDisabled,
};

export const status = {
  success: linkedinColors.successGreen,
  warning: linkedinColors.warningAmber,
  error: linkedinColors.errorRed,
  online: linkedinColors.onlineGreen,
};

export const grays = {
  100: linkedinColors.gray100,
  200: linkedinColors.gray200,
  300: linkedinColors.gray300,
  400: linkedinColors.gray400,
  500: linkedinColors.gray500,
  600: linkedinColors.gray600,
  700: linkedinColors.gray700,
  800: linkedinColors.gray800,
  900: linkedinColors.gray900,
};

export default linkedinColors;
