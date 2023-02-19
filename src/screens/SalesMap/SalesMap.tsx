import type {FC} from 'react';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MapView, {Circle} from 'react-native-maps';

import {useAuthContext} from '@contexts/AuthContext';
import useGeoLocation from '@hooks/useGeoLocation';
import type {AuthenticatedScreenProps} from '@navigation/types';

const saleValues = [
  {
    value: 400,
    city: 'campo_grande',
  },
  {
    value: 200,
    city: 'cuiaba',
  },
  {
    value: 1500,
    city: 'sao_paulo',
  },
];
const locationsCoords = {
  campo_grande: {
    latitude: -20.468,
    longitude: -54.629,
  },
  cuiaba: {
    latitude: -15.596,
    longitude: -56.096,
  },
  sao_paulo: {
    latitude: -23.548,
    longitude: -46.638,
  },
};

const SalesMap: FC<AuthenticatedScreenProps<'SalesMap'>> = ({navigation}) => {
  const {user} = useAuthContext();
  const {hasUserPosition, currentUserPosition} = useGeoLocation();

  const getRadius = (value: number) => 100 + ((value - 1) / 9) * 800;

  const renderCircles = () =>
    saleValues.map((value, index) => {
      const radius = getRadius(value.value);
      return (
        <Circle
          key={index}
          center={locationsCoords[value.city]}
          radius={radius}
          fillColor="rgba(255, 0, 0, 0.2)"
          strokeColor="rgba(255, 0, 0, 0.5)"
          strokeWidth={2}
        />
      );
    });

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        followsUserLocation
        rotateEnabled={false}
        style={styles.mapContainer}
        initialRegion={{
          latitude: -8.829458605014649,
          longitude: -51.20257414877415,
          latitudeDelta: 62.983141594483385,
          longitudeDelta: 34.66758504509926,
        }}>
        {renderCircles()}
      </MapView>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </View>
  );
};

export default SalesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    zIndex: 1,
  },
});
