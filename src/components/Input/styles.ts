import {Platform, StyleSheet} from 'react-native';

import type {StyleParams} from './types';

const createStyle = ({theme, error}: StyleParams) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 55,
      borderRadius: 7,
      backgroundColor: theme.colors.surfaceVariant,
      overflow: 'hidden',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: error ? theme.colors.error : theme.colors.surfaceVariant,
    },
    inputContainer: {
      flex: 1,
      borderWidth: 1,
    },
    input: {
      flex: 1,
      fontFamily: 'Jaldi-Regular',
      fontSize: 16,
      transform: [{translateY: Platform.OS === 'ios' ? 7 : 10}],
      color: theme.colors.onSurfaceVariant,
    },
    label: {
      position: 'absolute',
      color: theme.colors.outline,
      fontSize: 12,
      fontFamily: 'Jaldi-Regular',
      top: 5,
      left: 10,
    },
    error: {
      position: 'absolute',
      bottom: 0,
      right: 5,
      color: theme.colors.error,
      fontSize: 10,
      fontFamily: 'Jaldi-Regular',
    },
  });

export default createStyle;
