import AsyncStorage from '@react-native-async-storage/async-storage';

import {StorageData} from './types';

export const Storage = {
  async setToken(token: string) {
    await AsyncStorage.setItem(StorageData.token, token);
  },
  async removeToken() {
    await AsyncStorage.removeItem(StorageData.token);
  },
  async getToken() {
    return await AsyncStorage.getItem(StorageData.token);
  },
};
