import NetInfo from '@react-native-community/netinfo';

import type Sale from '@models/Sale';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SalesService} from '@services/sales';
import type {GetSalesResponse} from '@services/types';
import {Storage} from '@store/storage';
import WMSalesActions from '@store/watermelon/action/SalesActions';
import getUnitiesDataFromSales from '@utils/sales';

import type {RootState} from '..';

export type UnitySaleData = {
  unit: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  sales_amount: number;
};

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

      await dispatch(getUnitiesData(salesResponse));

      if (hasInternet) {
        await dispatch(handlePushSales(salesResponse.sales));
        await dispatch(handlePullSales());
        await Storage.setSalesData(salesResponse);
      }

      return salesResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUnitiesData = createAsyncThunk(
  'sales/getUserUnities',
  (
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

      const unitiesSalesData = getUnitiesDataFromSales(sales, units);

      return unitiesSalesData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const handlePullSales = createAsyncThunk(
  'sales/handlePullSales',
  async _ => {
    const notSyncedSales = await WMSalesActions.getNotSyncedSales();

    if (notSyncedSales.length > 0) {
      await WMSalesActions.syncNotSyncedSales(notSyncedSales);
      console.log('Local Sales Sended 📬');
    }
  },
);

export const handlePushSales = createAsyncThunk(
  'sales/handlePushSales',
  async (sales: Sale[]) => {
    const localSales = await WMSalesActions.getSales();

    const serverSales = sales!.filter(
      apiSale =>
        !localSales.find(localSale => localSale.sale_id === apiSale.sale_id),
    );

    console.log({new: serverSales.length});

    if (serverSales) {
      console.log('New sales 📲');
      await WMSalesActions.addServeSalesLocally(serverSales!);
    }
  },
);
