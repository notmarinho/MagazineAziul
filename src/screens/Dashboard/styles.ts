import {Platform, StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {colors, fonts}}: DefaultStyleParams) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      // backgroundColor: theme.colors.primary,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: 300,
      backgroundColor: colors.primary,
    },
    headerTitle: {
      color: colors.onPrimary,
      fontFamily: fonts.bold,
      fontSize: 20,
      letterSpacing: 2,
    },
    headerTotalAmount: {
      color: colors.onPrimary,
      fontFamily: fonts.bold,
      fontSize: 60,
    },
    headerSubtitle: {
      color: colors.onPrimary,
      fontFamily: fonts.regular,
      fontSize: 20,
    },
    salesList: {
      alignItems: 'center',
      paddingBottom: 100,
    },
    logoutButton: {
      position: 'absolute',
      height: 50,
      width: 50,
      top: Platform.OS === 'ios' ? 40 : 20,
      left: 20,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{rotate: '180deg'}],
    },
  });

export default createStyles;
