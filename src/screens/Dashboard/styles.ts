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
      paddingBottom: 150,
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
    itemSeparator: {
      width: 10,
    },
    progressListContent: {
      padding: 20,
    },
    progressListContainer: {
      maxHeight: 150,
    },
    filterButton: {
      height: 40,
      aspectRatio: 1,
      borderRadius: 25,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      marginTop: 10,
    },
    salesTitles: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.onBackground,
    },
    salesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });

export default createStyles;
