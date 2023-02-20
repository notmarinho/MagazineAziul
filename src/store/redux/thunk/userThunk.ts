import NetInfo from '@react-native-community/netinfo';

import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from '@services/auth';
import {Storage} from '@store/storage';
import WMSalesActions from '@store/watermelon/action/SalesActions';

export const initUser = createAsyncThunk(
  'user/init',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      await dispatch(checkSignedUser());
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkSignedUser = createAsyncThunk(
  'user/checkSignedUser',
  async (_, {rejectWithValue}) => {
    try {
      const tokenOnStorage = await Storage.getToken();

      if (!tokenOnStorage) {
        return null;
      }

      const hasInternet = await NetInfo.fetch().then(
        state => !!state.isConnected,
      );

      const userData = hasInternet
        ? await AuthService.getSignedUser()
        : await Storage.getUserData();

      Storage.setUserData(userData);

      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const token = await AuthService.loginWithEmail(email, password);

      await Storage.setToken(token.access_token);

      await dispatch(checkSignedUser());
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signOut = createAsyncThunk(
  'user/signOut',
  async (_, {rejectWithValue}) => {
    try {
      WMSalesActions.removeSales();
      Storage.removeSalesData();
      Storage.removeToken();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
