import {useState} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import useGeoLocation from '@hooks/useGeoLocation';
import type Sale from '@models/Sale';
import {SalesService} from '@services/sales';
import WMSalesActions from '@store/watermelon/action/SalesActions';

const useInsertSale = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saleValue, setSaleValue] = useState('');

  const {
    currentUserPosition,
    hasUserPosition,
    isLoading: isLoadingLocation,
  } = useGeoLocation();

  const navigation = useNavigation();

  const onSaleValueChange = (value: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setSaleValue(value);
    }
  };

  const handleAddSale = async () => {
    if (!saleValue) {
      Alert.alert('Atenção', 'Informe o valor da venda');
      return;
    }

    setIsLoading(true);

    await registerSale();

    Alert.alert('Sucesso');
    setIsLoading(false);
    navigation.goBack();
  };

  const addToLocalDB = async (sale: Sale | null) => {
    if (!sale) {
      WMSalesActions.addSale({
        latitude: String(currentUserPosition!.coords.latitude),
        longitude: String(currentUserPosition!.coords.longitude),
        sale_value: Number(saleValue),
      });
    } else {
      WMSalesActions.addSale(sale);
    }
  };

  const registerSale = async () =>
    await SalesService.insertSale({
      latitude: String(currentUserPosition!.coords.latitude),
      longitude: String(currentUserPosition!.coords.longitude),
      sale_value: saleValue,
    })
      .then(addToLocalDB)
      .catch(() => {
        addToLocalDB(null);
      });

  return {
    isLoading: isLoading || isLoadingLocation,
    saleValue,
    hasUserPosition,
    onSaleValueChange,
    handleAddSale,
  };
};

export default useInsertSale;
