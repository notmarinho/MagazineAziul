import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';

import salesSlice from './slice/salesSlice';
import userSlice from './slice/userSlice';

import reduxFlipper from 'redux-flipper';

export const store = configureStore({
  reducer: {
    sales: salesSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(reduxFlipper()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use the dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
