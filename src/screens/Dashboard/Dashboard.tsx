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

  const itemSeparator = () => <View style={styles.itemSeparator} />;

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
          contentContainerStyle={styles.progressListContent}
          style={styles.progressListContainer}
          ItemSeparatorComponent={itemSeparator}
        />
      )}

      <View style={styles.salesHeader}>
        <Text style={styles.salesTitles}>Vendas</Text>
        <Pressable
          onPress={() => bottomSheetRef.current?.expand()}
          style={styles.filterButton}>
          <Icon
            name="filter-variant"
            size={25}
            color={theme.colors.onPrimary}
          />
        </Pressable>
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
          renderItem={({item}) => <SaleCard sale_id={item.id} />}
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
