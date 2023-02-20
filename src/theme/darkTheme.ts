import type {AppTheme} from './defaultTheme';
import defaultTheme from './defaultTheme';

const darkTheme = {
  ...defaultTheme,
  dark: true,
  colors: {
    primary: 'rgb(182, 196, 255)',
    onPrimary: 'rgb(0, 39, 128)',
    primaryContainer: 'rgb(0, 58, 179)',
    onPrimaryContainer: 'rgb(220, 225, 255)',
    secondary: 'rgb(194, 197, 221)',
    onSecondary: 'rgb(43, 48, 66)',
    secondaryContainer: 'rgb(66, 70, 89)',
    onSecondaryContainer: 'rgb(222, 225, 249)',
    tertiary: 'rgb(227, 186, 218)',
    onTertiary: 'rgb(67, 39, 63)',
    tertiaryContainer: 'rgb(91, 61, 87)',
    onTertiaryContainer: 'rgb(255, 215, 245)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(27, 27, 31)',
    onBackground: 'rgb(228, 225, 230)',
    surface: 'rgb(27, 27, 31)',
    onSurface: 'rgb(228, 225, 230)',
    surfaceVariant: 'rgb(69, 70, 79)',
    onSurfaceVariant: 'rgb(198, 197, 208)',
    outline: 'rgb(144, 144, 154)',
    outlineVariant: 'rgb(69, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(228, 225, 230)',
    inverseOnSurface: 'rgb(48, 48, 52)',
    inversePrimary: 'rgb(34, 82, 215)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 35, 42)',
      level2: 'rgb(39, 41, 49)',
      level3: 'rgb(44, 46, 56)',
      level4: 'rgb(46, 47, 58)',
      level5: 'rgb(49, 51, 62)',
    },
    surfaceDisabled: 'rgba(228, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(228, 225, 230, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
  },
};

export type DarkTheme = typeof darkTheme & AppTheme;

export default darkTheme as DarkTheme;
