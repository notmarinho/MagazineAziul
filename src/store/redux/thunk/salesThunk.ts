import NetInfo from '@react-native-community/netinfo';
import {Q} from '@nozbe/watermelondb';

import type {SaleModel} from '@models/Sale';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SalesService} from '@services/sales';
import type {GetSalesResponse} from '@services/types';
import {Storage} from '@store/storage';
import database from '@store/watermelon';
import WMSalesActions from '@store/watermelon/action/SalesActions';

import type {UnityCoordsLocation} from '../../../constants/unitiesLocations';
import unitiesLocations from '../../../constants/unitiesLocations';
import type {RootState} from '..';

export type UnitySaleData = {
  unit: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  sales_amount: number;
};

const salesCollection = database.collections.get<SaleModel>('sales');

export const initSales = createAsyncThunk(
  'sales/init',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const hasInternet = await NetInfo.fetch().then(
        state => !!state.isConnected,
      );

      const salesResponse = hasInternet
        ? await SalesService.getSales()
        : await Storage.getSalesData();

      await Promise.all([
        Storage.setSalesData(salesResponse),
        dispatch(getUnitiesData(salesResponse)),
        dispatch(syncSales(salesResponse.sales)),
      ]);

      return salesResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUnitiesData = createAsyncThunk(
  'sales/getUserUnities',
  async (
    {sales, menu: {units}}: GetSalesResponse,
    {rejectWithValue, getState, fulfillWithValue},
  ) => {
    try {
      const {
        user: {user},
      } = getState() as RootState;

      if (user?.profile === 'salesman') {
        // Since the salesman only do not see the map, we can return an empty array
        return fulfillWithValue([]);
      }

      const unitiesSalesData = units.map(unit => {
        const unitSales = sales.filter(sale => sale.nearest_unit === unit);
        const unitSaleAmount = unitSales.reduce(
          (acc, sale) => acc + sale.sale_value,
          0,
        );

        return {
          unit,
          coords: unitiesLocations[unit as UnityCoordsLocation],
          sales_amount: unitSaleAmount,
        };
      });

      return unitiesSalesData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const syncSales = createAsyncThunk(
  'sales/syncSales',
  async (sales: GetSalesResponse['sales'] | undefined, {rejectWithValue}) => {
    try {
      const hasInternet = await NetInfo.fetch().then(
        state => !!state.isConnected,
      );

      if (!hasInternet) {
        return rejectWithValue("You're offline");
      }

      console.log('Syncing 🔄');
      if (!sales) {
        sales = await SalesService.getSales().then(response => response.sales);
      }

      let [localSales, notSyncedSales] = await Promise.all([
        salesCollection.query().fetch(),
        salesCollection.query(Q.where('synced', false)).fetch(),
      ]);

      const hasNotSyncedSales = notSyncedSales.length > 0;

      if (hasNotSyncedSales) {
        await WMSalesActions.syncNotSyncedSales(notSyncedSales);
        console.log('Local Sales Sended 📬');
      }

      const hasNewServerSales =
        sales!.filter(
          apiSale =>
            !localSales.find(
              localSale => localSale.sale_id === apiSale.sale_id,
            ),
        ).length > 0;

      if (hasNewServerSales) {
        await WMSalesActions.addServeSalesLocally(sales!);
        console.log('New sales 📲');
      }

      console.log('Synced ✅');
    } catch (error) {
      console.error('Something went wrong while syncing sales: ', error);
      return rejectWithValue(error);
    }
  },
);
