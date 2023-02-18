import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Pressable, Text, View} from 'react-native';

import {useAuthContext} from '@contexts/AuthContext';
import type Sale from '@models/Sale';
import type {AuthenticatedScreenProps} from '@navigation/types';
import {SalesService} from '@services/sales';

import styles from './styles';

const Dashboard: FC<AuthenticatedScreenProps<'Dashboard'>> = ({navigation}) => {
  const {logout, isSalesman} = useAuthContext();

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
        renderItem={({item}) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('SaleDetails', item)}>
            <Text>{item.sale_value}</Text>
          </Pressable>
        )}
      />
      {isSalesman && (
        <Button
          onPress={() => navigation.navigate('InsertSale')}
          title="Nova venda"
        />
      )}

      <Button onPress={logout} title="Sair" />
    </View>
  );
};

export default Dashboard;
