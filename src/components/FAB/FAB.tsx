import type {FC} from 'react';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

import createStyles from './styles';
import type {FABProps} from './types';

const FAB: FC<FABProps> = ({icon, ...props}) => {
  const theme = useTheme();
  const styles = createStyles({theme});
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Icon name={icon} size={30} color={theme.colors.onSecondary} />
    </TouchableOpacity>
  );
};

export default FAB;
