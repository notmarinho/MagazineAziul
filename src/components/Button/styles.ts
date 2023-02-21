import type {TextStyle, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native';

import type {GetStyleParams, StyleParams} from './types';

const getButtonStyle = ({theme, type}: GetStyleParams): ViewStyle => {
  switch (type) {
    case 'primary':
      return {
        backgroundColor: theme.colors.primary,
      };
    case 'secondary':
      return {
        backgroundColor: theme.colors.secondary,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      };
    case 'text':
      return {
        backgroundColor: 'transparent',
      };
    default:
      return {};
  }
};

const getButtonLabelStyle = ({theme, type}: GetStyleParams): TextStyle => {
  switch (type) {
    case 'primary':
      return {
        color: theme.colors.onPrimary,
      };
    case 'secondary':
      return {
        color: theme.colors.onSecondary,
      };
    case 'outline':
      return {
        color: theme.colors.primary,
      };
    case 'text':
      return {
        color: theme.colors.onBackground,
      };
  }
};

const createStyles = ({theme, type}: StyleParams) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: 55,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      ...getButtonStyle({theme, type}),
    },
    buttonLabel: {
      fontFamily: theme.fonts.bold,
      fontSize: 18,
      ...getButtonLabelStyle({theme, type}),
    },
  });

export default createStyles;
