import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {colors, fonts}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 60,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.inverseOnSurface,
      paddingHorizontal: 10,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    label: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.secondary,
    },
    value: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.primary,
    },
  });

export default createStyles;
