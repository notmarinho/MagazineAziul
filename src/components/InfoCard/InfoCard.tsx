import type {FC} from 'react';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

import createStyles from './styles';
import type {InfoCardProps} from './types';

const InfoCard: FC<InfoCardProps> = ({icon, label, value}) => {
  const theme = useTheme();
  const styles = createStyles({theme});
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Icon name={icon} size={25} color={theme.colors.outline} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default InfoCard;
