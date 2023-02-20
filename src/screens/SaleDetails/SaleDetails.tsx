import type {FC} from 'react';
import React from 'react';
import {Button, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import type {AuthenticatedScreenProps} from '@navigation/types';

import styles from './styles';

const SaleDetails: FC<AuthenticatedScreenProps<'SaleDetails'>> = ({
  route,
  navigation,
}) => {
  const {longitude, latitude, synced} = route.params;

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
      <MapView
        initialRegion={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        style={styles.mapContainer}>
        <Marker
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}
        />
      </MapView>

      <Button title="voltar" onPress={navigation.goBack} />
    </View>
  );
};

export default SaleDetails;
