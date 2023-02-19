import type {FC} from 'react';
import React from 'react';
import {LogBox, Text, View} from 'react-native';

import type {AuthenticatedScreenProps} from '@navigation/types';

import styles from './styles';

const SaleDetails: FC<AuthenticatedScreenProps<'SaleDetails'>> = ({route}) => {
  const {longitude, latitude, synced} = route.params;

  // @TEMPORALLY
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <View style={styles.container}>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
      <Text
        style={{
          color: synced ? 'green' : 'red',
          fontSize: 30,
          textAlign: 'center',
        }}>
        {synced ? 'Sincronizado' : 'Não sincronizado'}
      </Text>
    </View>
  );
};

export default SaleDetails;
