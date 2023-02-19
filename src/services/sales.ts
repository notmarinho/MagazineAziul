import type Sale from '@models/Sale';

import api from './api';
import type {
  FilterSalesParams,
  GetSalesResponse,
  InsertSaleParams,
  InsertSaleRoamingParams,
} from './types';

export const SalesService = {
  async getSales(filterParams: FilterSalesParams = {}) {
    const response = await api.get<GetSalesResponse>('/sales', {
      params: filterParams,
    });
    return response.data;
  },
  async getSaleDetail(saleId: string) {
    const response = await api.get<Sale>(`/sale/${saleId}`);
    return response.data;
  },
  async insertSale(saleParams: InsertSaleParams) {
    const response = await api.post<Sale>('/insert-sale', saleParams);
    return response.data;
  },
  async insertSaleRoaming(saleParams: InsertSaleRoamingParams) {
    const response = await api.post('/insert-sale-roaming', saleParams);
    return response.data;
  },
};
