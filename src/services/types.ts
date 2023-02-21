import type Sale from '@models/Sale';

export interface LoginWithEmailResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RefreshTokenResponse extends LoginWithEmailResponse {}

export interface GetSalesResponse {
  sales: Sale[];
  sales_amount: number;
  menu: Menu;
}

export interface InsertSaleParams {
  latitude: string;
  longitude: string;
  sale_value: string;
  date_of_sale?: string;
}

export interface InsertSaleRoamingParams extends InsertSaleParams {
  roaming: number;
}

export interface FilterSalesParams {
  board?: string;
  salesman?: string;
  unit?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface Menu {
  boards: string[];
  salesman: string[];
  units: string[];
}
