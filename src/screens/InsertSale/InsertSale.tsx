import type {FC} from 'react';
import {useState} from 'react';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import useGeoLocation from '@hooks/useGeoLocation';
import type {AuthenticatedScreenProps} from '@navigation/types';
import {SalesService} from '@services/sales';

import styles from './styles';

const InsertSale: FC<AuthenticatedScreenProps<'InsertSale'>> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [saleValue, setSaleValue] = useState('');

  const {
    currentUserPosition,
    hasUserPosition,
    isLoading: isLoadingLocation,
  } = useGeoLocation();

  const onSaleValueChange = (text: string) => {
    // Only allow numbers
    const regex = /^[0-9]*$/;
    if (regex.test(text)) {
      setSaleValue(text);
    }
  };

  const onInsertSale = () => {
    if (saleValue === '') {
      Alert.alert('Error', 'You need to insert a sale value');
      return;
    }

    setIsLoading(true);
    SalesService.insertSale({
      sale_value: saleValue,
      latitude: String(currentUserPosition!.coords.latitude),
      longitude: String(currentUserPosition!.coords.longitude),
    })
      .then(response => console.log(response))
      .then(() => {
        Alert.alert('Success', 'Sale inserted successfully');
        setSaleValue('');
        navigation.navigate('Dashboard');
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={saleValue}
          onChangeText={onSaleValueChange}
          autoFocus
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        onPress={onInsertSale}
        style={hasUserPosition ? styles.button : styles.disabledButton}
        disabled={!hasUserPosition}>
        {isLoadingLocation || isLoading ? (
          <ActivityIndicator animating />
        ) : (
          <Text
            style={styles.buttonLabel}
            adjustsFontSizeToFit
            numberOfLines={1}>
            {hasUserPosition
              ? 'Insert sale'
              : 'You need to allow location access to insert a sale'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InsertSale;
