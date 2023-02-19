import type {FC} from 'react';
import React from 'react';
import {Button, FlatList, Pressable, Text, View} from 'react-native';

import type {AuthenticatedScreenProps} from '@navigation/types';

import styles from './styles';
import useDashboard from './useDashboard';

const Dashboard: FC<AuthenticatedScreenProps<'Dashboard'>> = ({navigation}) => {
  const {sales, isSalesman, onLogout, user} = useDashboard();

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
