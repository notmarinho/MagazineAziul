import type Sale from '@models/Sale';

export type NonAuthenticatedStackParamList = {
  Login: undefined;
};

export type AuthenticatedStackParamList = {
  Dashboard: undefined;
  SaleDetails: Sale;
};
