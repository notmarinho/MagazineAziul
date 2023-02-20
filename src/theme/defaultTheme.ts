import type {Theme} from '@react-navigation/native';

const defaultTheme = {
  dark: false,
  colors: {
    primary: 'rgb(34, 82, 215)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(220, 225, 255)',
    onPrimaryContainer: 'rgb(0, 21, 80)',
    secondary: 'rgb(89, 93, 114)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(222, 225, 249)',
    onSecondaryContainer: 'rgb(22, 27, 44)',
    tertiary: 'rgb(117, 84, 111)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 215, 245)',
    onTertiaryContainer: 'rgb(44, 18, 42)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(254, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(254, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(226, 225, 236)',
    onSurfaceVariant: 'rgb(69, 70, 79)',
    outline: 'rgb(118, 118, 128)',
    outlineVariant: 'rgb(198, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(242, 240, 244)',
    inversePrimary: 'rgb(182, 196, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(243, 243, 253)',
      level2: 'rgb(236, 238, 252)',
      level3: 'rgb(230, 232, 251)',
      level4: 'rgb(228, 231, 250)',
      level5: 'rgb(223, 227, 249)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
  },
};

export type AppTheme = typeof defaultTheme & Theme;

export default defaultTheme as AppTheme;
