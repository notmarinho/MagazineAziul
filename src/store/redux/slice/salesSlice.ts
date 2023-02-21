import type Sale from '@models/Sale';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {Menu} from '@services/types';

import type {UnitySaleData} from '../thunk/salesThunk';
import {handlePushSales} from '../thunk/salesThunk';
import {handlePullSales} from '../thunk/salesThunk';
import {syncSales} from '../thunk/salesThunk';
import {getUnitiesData, initSales} from '../thunk/salesThunk';

interface SalesState {
  unitiesSalesData: UnitySaleData[];
  salesAmount: number;
  sales: Sale[];
  currentSale: Sale | null;
  menu: Menu | null;
  isLoading: boolean;
  isLoadingPull: boolean;
  isLoadingPush: boolean;
}

const initialState: SalesState = {
  unitiesSalesData: [],
  salesAmount: 0,
  sales: [],
  currentSale: null,
  menu: null,
  isLoading: true,
  isLoadingPull: false,
  isLoadingPush: false,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setCurrentSale: (
      state,
      action: PayloadAction<SalesState['currentSale']>,
    ) => {
      state.currentSale = action.payload;
    },
  },
  extraReducers: ({addCase}) => {
    addCase(getUnitiesData.fulfilled, (state, action) => {
      state.unitiesSalesData = action.payload;
    });
    addCase(initSales.pending, state => {
      state.isLoading = true;
    });
    addCase(initSales.fulfilled, (state, action) => {
      state.salesAmount = action.payload.sales_amount;
      state.menu = action.payload.menu;
      state.sales = action.payload.sales;
      state.isLoading = false;
    });
    addCase(handlePullSales.pending, state => {
      state.isLoadingPull = true;
    });
    addCase(handlePullSales.fulfilled, state => {
      state.isLoadingPull = false;
    });
    addCase(handlePushSales.pending, state => {
      state.isLoadingPush = true;
    });
    addCase(handlePushSales.fulfilled, state => {
      state.isLoadingPush = false;
    });
  },
});

export const {setCurrentSale} = salesSlice.actions;

export default salesSlice.reducer;
