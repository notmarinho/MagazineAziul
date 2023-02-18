import type {FC} from 'react';
import React from 'react';
import {Text, View} from 'react-native';

import type {AuthenticatedScreenProps} from '@navigation/types';

import styles from './styles';

const SaleDetails: FC<AuthenticatedScreenProps<'SaleDetails'>> = ({route}) => {
  const {longitude, latitude} = route.params;
  return (
    <View style={styles.container}>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
    </View>
  );
};

export default SaleDetails;
