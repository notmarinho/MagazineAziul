import {useEffect, useRef, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';

import {useAuthContext} from '@contexts/AuthContext';
import type BottomSheet from '@gorhom/bottom-sheet';
import type {SaleModel} from '@models/Sale';
import type {FilterSalesParams} from '@services/types';
import WMSalesActions from '@store/watermelon/action/SalesActions';

const useDashboard = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [displaySales, setDisplaySales] = useState<SaleModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {logout, isSalesman, user} = useAuthContext();

  const onLogout = () => {
    WMSalesActions.removeSales();
    logout();
  };

  const onSalesChange = (sales: SaleModel[]) => {
    setSales(sales);
    setDisplaySales(sales);
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
    onLogout,
    isLoading,
    isSalesman,
    bottomSheetRef,
    handleFilterSales,
  };
};

export default useDashboard;
