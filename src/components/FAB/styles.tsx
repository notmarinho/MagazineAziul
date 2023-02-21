import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {colors}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      aspectRatio: 1,
      width: 75,
      borderRadius: 40,
      backgroundColor: colors.secondary,
      bottom: 40,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      right: 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
      zIndex: 100,
    },
  });

export default createStyles;
