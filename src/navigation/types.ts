import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import type Sale from '@models/Sale';

export type NonAuthenticatedStackParamList = {
  Login: undefined;
};

export type AuthenticatedStackParamList = {
  Dashboard: undefined;
  SaleDetails: Sale;
  InsertSale: undefined;
  SalesMap: undefined;
};

export type NonAuthenticatedScreenProps<
  T extends keyof NonAuthenticatedStackParamList,
> = NativeStackScreenProps<NonAuthenticatedStackParamList, T>;

export type AuthenticatedScreenProps<
  T extends keyof AuthenticatedStackParamList,
> = NativeStackScreenProps<AuthenticatedStackParamList, T>;
