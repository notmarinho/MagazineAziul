import {useEffect, useRef, useState} from 'react';

import {useTheme} from '@react-navigation/native';

import {useAppContext} from '@contexts/AppContext';
import type BottomSheet from '@gorhom/bottom-sheet';
import type {SaleModel} from '@models/Sale';
import type {FilterSalesParams} from '@services/types';
import {useAppSelector} from '@store/redux';
import WMSalesActions from '@store/watermelon/action/SalesActions';

const useDashboard = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [displaySales, setDisplaySales] = useState<SaleModel[]>([]);
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {signOut} = useAppContext();
  const user = useAppSelector(state => state.user.user);
  const isSalesman = user?.profile === 'salesman';

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
    onLogout: signOut,
    isSalesman,
    bottomSheetRef,
    handleFilterSales,
    theme,
  };
};

export default useDashboard;
