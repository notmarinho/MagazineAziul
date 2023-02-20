import '@react-navigation/native';

import type {AppTheme} from './defaultTheme';

declare module '@react-navigation/native' {
  export function useTheme(): AppTheme;
}
