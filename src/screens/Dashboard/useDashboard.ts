import {useEffect, useMemo, useRef, useState} from 'react';
import type {AlertButton} from 'react-native';
import {Alert} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {useAppContext} from '@contexts/AppContext';
import type BottomSheet from '@gorhom/bottom-sheet';
import type {SaleModel} from '@models/Sale';
import type {FilterSalesParams} from '@services/types';
import {useAppSelector} from '@store/redux';
import WMSalesActions from '@store/watermelon/action/SalesActions';
import getUnitiesDataFromSales from '@utils/sales';

import createStyles from './styles';

const cancelAlertButton: AlertButton = {
  text: 'Não',
  style: 'cancel',
};

const useDashboard = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [displaySales, setDisplaySales] = useState<SaleModel[]>([]);
  const theme = useTheme();

  const {salesAmount, menu, isLoadingPush, isLoadingPull} = useAppSelector(
    state => state.sales,
  );

  const displaySalesAmount = useMemo(
    () => displaySales.reduce((acc, sale) => acc + sale.sale_value, 0),
    [displaySales],
  );
  const displayUnitiesData = useMemo(
    () => getUnitiesDataFromSales(displaySales, menu?.units),
    [displaySales],
  );

  const styles = createStyles({theme});

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {signOut} = useAppContext();
  const user = useAppSelector(state => state.user.user);
  const isSalesman = user?.profile === 'salesman';

  const onLogoutPress = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      cancelAlertButton,
      {text: 'Sim', onPress: () => signOut()},
    ]);
  };
  const onSalesChange = (nextSales: SaleModel[]) => {
    setSales(nextSales);
    setDisplaySales(nextSales);
  };

  const handleFilterSales = async (filterParams: FilterSalesParams) => {
    bottomSheetRef.current?.close();
    const hasNoFilter = Object.values(filterParams).every(
      filter => filter === undefined,
    );
    if (hasNoFilter) {
      setDisplaySales(sales);
    } else {
      const filteredSales = await WMSalesActions.filterSales(filterParams);
      setDisplaySales(filteredSales);
    }
  };

  useEffect(() => {
    const observeSalesItems =
      WMSalesActions.observerSales().subscribe(onSalesChange);

    return () => {
      observeSalesItems.unsubscribe();
    };
  }, []);

  return {
    sales: displaySales,
    user,
    onLogout: onLogoutPress,
    isSalesman,
    bottomSheetRef,
    handleFilterSales,
    theme,
    styles,
    salesAmount,
    displaySalesAmount,
    displayUnitiesData,
    isLoadingPush,
    isLoadingPull,
  };
};

export default useDashboard;
