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
}

export interface InsertSaleParams {
  latitude: string;
  longitude: string;
  sale_value: number;
}

export interface InsertSaleRoamingParams extends InsertSaleParams {
  roaming: number;
}
