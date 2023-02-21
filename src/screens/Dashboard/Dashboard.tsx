import type {FC} from 'react';
import React from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '@components/Button/Button';
import FAB from '@components/FAB/FAB';
import FilterBottomSheet from '@components/FilterBottomSheet/FilterBottomSheet';
import SaleCard from '@components/SaleCard/SaleCard';
import type {AuthenticatedScreenProps} from '@navigation/types';

import toCurrency from '../../utils/toCurrency';
import useDashboard from './useDashboard';

const Dashboard: FC<AuthenticatedScreenProps<'Dashboard'>> = ({navigation}) => {
  const {
    sales,
    isSalesman,
    onLogout,
    handleFilterSales,
    bottomSheetRef,
    styles,
    salesAmount,
    theme,
    displaySalesAmount,
    displayUnitiesData,
  } = useDashboard();

  const {width} = useWindowDimensions();

  const renderHeader = () => (
    <View>
      <View style={[styles.header, {width}]}>
        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <Icon name="logout" size={25} color={theme.colors.onPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>TOTAL VENDAS</Text>
        <Text
          style={styles.headerTotalAmount}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {toCurrency(displaySalesAmount)}
        </Text>
        <Text style={styles.headerSubtitle}>{`${sales.length} VENDAS`}</Text>
      </View>

      {!isSalesman && (
        <FlatList
          data={displayUnitiesData}
          horizontal
          renderItem={({item, index}) => (
            <CircularProgress
              value={item.sales_amount}
              maxValue={salesAmount}
              title={item.unit}
              duration={2000}
              titleColor={theme.colors.outline}
              progressValueFontSize={16}
              delay={index * 500}
              valuePrefix="R$"
              activeStrokeColor={theme.colors.primary}
              titleFontSize={12}
            />
          )}
          contentContainerStyle={{
            padding: 20,
          }}
          style={{
            maxHeight: 150,
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: 10,
              }}
            />
          )}
        />
      )}

      <View>
        <Button
          label="Filtrar"
          type="text"
          onPress={() => bottomSheetRef.current?.expand()}
        />
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.salesList}
          data={sales}
          renderItem={({item}) => <SaleCard sale={item} />}
        />
        {isSalesman && (
          <FAB
            icon="currency-usd"
            onPress={() => navigation.navigate('InsertSale')}
          />
        )}
      </View>
      <FilterBottomSheet ref={bottomSheetRef} onFilter={handleFilterSales} />
      <StatusBar backgroundColor={theme.colors.primary} />
    </>
  );
};

export default Dashboard;
