import type {FC} from 'react';
import React from 'react';
import {Button, FlatList, Pressable, Text, View} from 'react-native';

import FilterBottomSheet from '@components/FilterBottomSheet/FilterBottomSheet';
import type {AuthenticatedScreenProps} from '@navigation/types';

import toCurrency from '../../utils/toCurrency';
import styles from './styles';
import useDashboard from './useDashboard';

const Dashboard: FC<AuthenticatedScreenProps<'Dashboard'>> = ({navigation}) => {
  const {sales, isSalesman, onLogout, handleFilterSales, bottomSheetRef, user} =
    useDashboard();

  const renderHeader = () =>
    !isSalesman ? (
      <View style={styles.header}>
        <Text>Olá, {user?.name}</Text>
        <Button
          title="Filtrar"
          onPress={() => bottomSheetRef.current?.expand()}
        />
      </View>
    ) : null;

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={sales}
          renderItem={({item}) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate('SaleDetails', item.getData())
              }>
              <Text>{toCurrency(item.sale_value)}</Text>
            </Pressable>
          )}
          ListEmptyComponent={() => <Text>Nenhuma venda encontrada</Text>}
          ListHeaderComponent={renderHeader}
        />
        {isSalesman && (
          <Button
            onPress={() => navigation.navigate('InsertSale')}
            title="Nova venda"
          />
        )}

        <Button onPress={onLogout} title="Sair" />
      </View>
      <FilterBottomSheet ref={bottomSheetRef} onFilter={handleFilterSales} />
    </>
  );
};

export default Dashboard;
