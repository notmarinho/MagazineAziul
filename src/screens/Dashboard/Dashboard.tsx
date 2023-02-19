import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Pressable, Text, View} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import {useAuthContext} from '@contexts/AuthContext';
import type {SaleModel} from '@models/Sale';
import type {AuthenticatedScreenProps} from '@navigation/types';
import WMSalesActions from '@store/watermelon/action/SalesActions';

import styles from './styles';

const Dashboard: FC<AuthenticatedScreenProps<'Dashboard'>> = ({navigation}) => {
  const {logout, isSalesman, user} = useAuthContext();

  const [sales, setSales] = useState<SaleModel[]>([]);
  const [shouldSync, setShouldSync] = useState(true);
  const [hasInternet, setHasInternet] = useState(true);

  const onLogout = () => {
    WMSalesActions.removeSales();
    logout();
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
    if (shouldSync && hasInternet) {
      WMSalesActions.syncLocalSalesWithServer();
      setShouldSync(false);
    }

    if (!hasInternet && !shouldSync) {
      setShouldSync(true);
    }
  }, [hasInternet, shouldSync]);

  return (
    <View style={styles.container}>
      <FlatList
        data={sales}
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('SaleDetails', item.getData())}>
            <Text>{item.sale_value}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => <Text>Nenhuma venda encontrada</Text>}
        ListHeaderComponent={() => <Text>{user?.name}</Text>}
      />
      {isSalesman && (
        <Button
          onPress={() => navigation.navigate('InsertSale')}
          title="Nova venda"
        />
      )}

      <Button onPress={onLogout} title="Sair" />
    </View>
  );
};

export default Dashboard;
