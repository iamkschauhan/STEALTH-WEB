// Design system constants matching iOS app

export const AuthStyle = {
  // Colors
  screenBackground: '#000000',
  surfaceDark: 'rgba(51, 51, 56, 1)', // rgb(0.2, 0.2, 0.22)
  accent: 'rgb(255, 128, 0)', // Orange
  accentBlue: 'rgb(51, 153, 255)',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textLabel: 'rgba(255, 255, 255, 0.9)',
  textSecondary: 'rgba(255, 255, 255, 0.8)',
  textHelper: 'rgba(255, 255, 255, 0.7)',
  textIcon: 'rgba(255, 255, 255, 0.6)',
  
  // Spacing
  horizontalPadding: 24,
  fieldVerticalPadding: 14,
  fieldHorizontalPadding: 16,
  fieldSpacing: 20,
  buttonSpacing: 16,
  labelInputSpacing: 8,
  titleSubtitleSpacing: 8,
  linkSpacing: 4,
  
  // Sizes
  buttonHeight: 50,
  iconButtonSize: 50,
  radius: 35,
} as const;
