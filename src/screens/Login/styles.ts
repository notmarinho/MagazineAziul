import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    header: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 30,
    },
    headerTextContainer: {},
    headerTitle: {
      color: theme.colors.onBackground,
      fontFamily: theme.fonts.bold,
      textAlign: 'center',
      fontSize: 24,
    },
    headerSubtitle: {
      color: theme.colors.outline,
      textAlign: 'center',
    },
    inputsContainer: {
      flex: 2,
      gap: 10,
      width: '100%',
    },
    input: {
      width: '100%',
      height: 55,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    buttonsContainer: {
      // gap: 10,
      marginTop: 10,
    },
    logo: {
      width: 100,
      aspectRatio: 1,
    },
    DEV_BUTTON_CONTAINER: {
      width: '100%',
      gap: 10,
    },
  });

export default createStyles;
