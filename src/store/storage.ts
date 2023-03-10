import type User from '@models/User';
import type {GetSalesResponse} from '@services/types';

import {StorageData} from './types';
import database from './watermelon';

export const Storage = {
  async setToken(token: string) {
    await database.localStorage.set(StorageData.token, token);
  },
  async removeToken() {
    await database.localStorage.remove(StorageData.token);
  },
  async getToken() {
    return await database.localStorage.get(StorageData.token);
  },
  async setUserData(user: User) {
    await database.localStorage.set(StorageData.user_data, user);
  },
  async removeUserData() {
    await database.localStorage.remove(StorageData.user_data);
  },
  async getUserData() {
    return (await database.localStorage.get(StorageData.user_data)) as User;
  },
  async setSalesData(salesData: GetSalesResponse) {
    await database.localStorage.set(StorageData.sales_data, salesData);
  },
  async removeSalesData() {
    await database.localStorage.remove(StorageData.sales_data);
  },
  async getSalesData() {
    return (await database.localStorage.get(
      StorageData.sales_data,
    )) as GetSalesResponse;
  },
};
