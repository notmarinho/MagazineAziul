import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {fonts, colors}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    infoContainer: {
      flex: 1,
      padding: 20,
      gap: 10,
    },
    info: {
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    value: {
      fontSize: 40,
      fontFamily: fonts.bold,
      color: colors.primary,
    },
    locationContainer: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    mapContainer: {
      height: 300,
      overflow: 'hidden',
    },
    callOutRoaming: {
      width: '100%',
      height: 60,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.errorContainer,
      gap: 10,
    },
    callOutRoamingText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: colors.onErrorContainer,
    },
    backButton: {
      position: 'absolute',
      zIndex: 1,
      top: 50,
      left: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default createStyles;
