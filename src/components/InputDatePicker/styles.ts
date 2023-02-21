import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {colors, fonts}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 55,
      borderRadius: 7,
      backgroundColor: colors.surfaceVariant,
      overflow: 'hidden',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    date: {
      flex: 1,
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.onSurfaceVariant,
      transform: [{translateY: 15}],
    },
    label: {
      position: 'absolute',
      color: colors.outline,
      fontSize: 12,
      fontFamily: fonts.regular,
      top: 5,
      left: 10,
    },
  });

export default createStyles;
