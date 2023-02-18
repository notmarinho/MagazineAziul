import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';

import type Sale from '@models/Sale';
import {SalesService} from '@services/sales';

import {useAuthContext} from '../../contexts/AuthContext';
import styles from './styles';

const Dashboard = () => {
  const {logout} = useAuthContext();

  const [sales, setSales] = useState<Sale[]>([]);

  const getUserSales = async () => {
    const response = await SalesService.getSales();
    setSales(response.sales);
  };

  useEffect(() => {
    getUserSales();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sales}
        renderItem={({item}) => <Text>{item.sale_value}</Text>}
      />
      <Button onPress={logout} title="Sair" />
    </View>
  );
};

export default Dashboard;
