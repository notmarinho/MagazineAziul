import {StyleSheet} from 'react-native';

import type {DefaultStyleParams} from '@theme/types';

const createStyles = ({theme: {colors, fonts}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      height: 75,
    },
    title: {
      color: colors.onBackground,
      fontFamily: fonts.regular,
      fontSize: 22,
      paddingHorizontal: 20,
    },
    itemContainer: {
      borderRadius: 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outline,
      paddingHorizontal: 16,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainerSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    itemLabel: {
      color: colors.onBackground,
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    itemLabelSelected: {
      color: colors.onPrimary,
    },
    separator: {
      width: 8,
    },
    listContent: {
      paddingHorizontal: 20,
    },
  });

export default createStyles;
