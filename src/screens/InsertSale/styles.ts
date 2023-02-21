import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const creteStyles = ({theme: {colors, fonts}}: DefaultStyleParams) =>
  StyleSheet.create({
    flex1: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      flex: 1,
      gap: 10,
    },
    title: {
      fontSize: 40,
      fontFamily: fonts.bold,
      color: colors.onBackground,
    },
    input: {
      height: 55,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 20,
    },
    button: {
      height: 55,
      width: '100%',
      backgroundColor: '#000',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledButton: {
      height: 55,
      width: '100%',
      backgroundColor: '#ccc',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default creteStyles;
