import {useEffect, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';

import {useAuthContext} from '@contexts/AuthContext';
import type {SaleModel} from '@models/Sale';
import WMSalesActions from '@store/watermelon/action/SalesActions';

const useDashboard = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [shouldSync, setShouldSync] = useState(true);
  const [hasInternet, setHasInternet] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const {logout, isSalesman, user} = useAuthContext();

  const onLogout = () => {
    WMSalesActions.removeSales();
    logout();
  };

  const handleShouldSync = () => {
    // Connection is back, sync local sales with server
    if (shouldSync && hasInternet) {
      setIsLoading(true);
      WMSalesActions.syncLocalSalesWithServer()
        .then(() => console.log('Synced! ✅'))
        .catch(error => console.log(`${error.message} 🚨`))
        .finally(() => {
          setIsLoading(false);
          setShouldSync(false);
        });
    }

    // Connection is lost, set shouldSync to true
    if (!hasInternet && !shouldSync) {
      setShouldSync(true);
    }
  };

  useEffect(() => {
    const observeSalesItems =
      WMSalesActions.observerSales().subscribe(setSales);

    const unsubscribeNetInfo = NetInfo.addEventListener(state =>
      setHasInternet(!!state.isConnected),
    );

    return () => {
      unsubscribeNetInfo();
      observeSalesItems.unsubscribe();
    };
  }, []);

  useEffect(() => {
    handleShouldSync();
  }, [hasInternet, shouldSync]);

  return {
    sales,
    user,
    onLogout,
    isLoading,
    isSalesman,
  };
};

export default useDashboard;
