import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {colors, fonts}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 70,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.primaryContainer,
      marginTop: 10,
    },
    leftContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    value: {
      fontFamily: fonts.bold,
      color: colors.primary,
      fontSize: 24,
      transform: [{translateY: 5}],
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    location: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.secondary,
    },
    date: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.secondary,
    },
    rightContainer: {
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: '100%',
    },
  });

export default createStyles;
