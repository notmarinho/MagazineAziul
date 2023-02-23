import type {FC} from 'react';
import React, {useCallback, useEffect, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, {Circle} from 'react-native-maps';

import Button from '@components/Button/Button';
import type {AuthenticatedScreenProps} from '@navigation/types';
import {useAppSelector} from '@store/redux';

import type {UnityCoordsLocation} from '../../constants/unitiesLocations';
import unitiesLocations from '../../constants/unitiesLocations';

const SalesMap: FC<AuthenticatedScreenProps<'SalesMap'>> = ({
  navigation,
  theme,
}) => {
  const {
    unitiesSalesData,
    salesAmount: totalSales,
    menu,
  } = useAppSelector(state => state.sales);

  console.log('Theme on maps: ', theme?.fonts?.regular);

  const mapRef = useRef<MapView>(null);

  const getRadius = (salesAmount: number) => {
    if (salesAmount === 0 || totalSales === 0) {
      return 0;
    }
    const radius = (salesAmount / totalSales) * 150000;
    return radius;
  };

  const fitToCoordinates = () => {
    const coordinates = menu?.units.map(
      location => unitiesLocations[location as UnityCoordsLocation],
    );

    if (coordinates?.length === 1) {
      mapRef.current?.animateToRegion({
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    } else {
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: {top: 10, right: 50, bottom: 10, left: 50},
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (menu?.boards) {
      fitToCoordinates();
    }
  }, [menu?.boards]);

  const renderCircles = useCallback(
    () =>
      unitiesSalesData.map((location, index) => {
        const radius = getRadius(location.sales_amount);
        return (
          <Circle
            key={`@SaleCircle-${index}`}
            center={location.coords}
            radius={radius}
            fillColor="rgba(255, 0, 0, 0.5)"
            strokeColor="rgba(255, 0, 0, 0.5)"
            strokeWidth={5}
          />
        );
      }),
    [unitiesSalesData, totalSales],
  );
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
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
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
        <Button
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: Platform.OS === 'ios' ? 60 : 40,
          }}
          label="Ir para Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
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
