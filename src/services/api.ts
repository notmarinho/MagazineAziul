import {StorageData} from '@store/types';
import database from '@store/watermelon';

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.testfront.cvti.cloud/api',
});

api.interceptors.request.use(async config => {
  const token = await database.localStorage.get(StorageData.token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
