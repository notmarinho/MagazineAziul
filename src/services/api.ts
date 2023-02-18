import AsyncStorage from '@react-native-async-storage/async-storage';

import {StorageData} from '@store/types';

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.testfront.cvti.cloud/api',
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(StorageData.token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
