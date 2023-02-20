import type Sale from '@models/Sale';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {Menu} from '@services/types';

import type {UnitySaleData} from '../thunk/salesThunk';
import {syncSales} from '../thunk/salesThunk';
import {getUnitiesData, initSales} from '../thunk/salesThunk';

interface SalesState {
  unitiesSalesData: UnitySaleData[];
  salesAmount: number;
  sales: Sale[];
  menu: Menu | null;
  isLoading: boolean;
}

const initialState: SalesState = {
  unitiesSalesData: [],
  salesAmount: 0,
  sales: [],
  menu: null,
  isLoading: true,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setUnitiesSalesData: (state, action: PayloadAction<UnitySaleData[]>) => {
      state.unitiesSalesData = action.payload;
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
    addCase(syncSales.pending, state => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    });
    addCase(syncSales.fulfilled, state => {
      state.isLoading = false;
    });
  },
});

export default salesSlice.reducer;
