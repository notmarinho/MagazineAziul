import type {FC} from 'react';
import React, {useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from '@react-navigation/native';

import InfoCard from '@components/InfoCard/InfoCard';
import type {AuthenticatedScreenProps} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/redux';
import {setCurrentSale} from '@store/redux/slice/salesSlice';
import {formatStringDate} from '@utils/date';
import toCurrency from '@utils/toCurrency';

import createStyles from './styles';

import {format} from 'date-fns';

const SaleDetails: FC<AuthenticatedScreenProps<'SaleDetails'>> = ({
  navigation,
}) => {
  const currentSale = useAppSelector(state => state.sales.currentSale!);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const styles = createStyles({theme});

  useEffect(
    () => () => {
      dispatch(setCurrentSale(null));
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={navigation.goBack}>
        <Icon name="arrow-left" size={30} color={theme.colors.primary} />
      </Pressable>
      <MapView
        initialRegion={{
          latitude: Number(currentSale.latitude),
          longitude: Number(currentSale.longitude),
          latitudeDelta: 0.24,
          longitudeDelta: 0.24,
        }}
        style={styles.mapContainer}>
        <Marker
          coordinate={{
            latitude: Number(currentSale.latitude),
            longitude: Number(currentSale.longitude),
          }}
        />
      </MapView>
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.value}>{toCurrency(currentSale.sale_value)}</Text>
          <Icon
            name={currentSale.synced ? 'cloud-check' : 'cloud-alert'}
            size={30}
            color={
              currentSale.synced ? theme.colors.primary : theme.colors.error
            }
          />
        </View>
        {currentSale.roaming === 1 && (
          <View style={styles.callOutRoaming}>
            <Icon name="alert-circle" size={25} color={theme.colors.error} />
            <Text style={styles.callOutRoamingText}>
              Esta venda é um roaming
            </Text>
          </View>
        )}
        <InfoCard
          icon="calendar"
          label="Data"
          value={formatStringDate(currentSale.date_of_sale!)}
        />
        <InfoCard
          icon="account"
          label="Vendedor"
          value={currentSale.salesman!}
        />
        <InfoCard
          icon="store-marker"
          label="Base"
          value={currentSale.board_salesman!}
        />
        <InfoCard
          icon="map-marker"
          label="Local da Venda"
          value={currentSale.nearest_unit!}
        />
      </View>
    </View>
  );
};

export default SaleDetails;
