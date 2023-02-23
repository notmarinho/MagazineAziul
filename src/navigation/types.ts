import type {FC} from 'react';

import type {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type {AppTheme} from '@theme/defaultTheme';

export type NonAuthenticatedStackParamList = {
  Login: undefined;
};

export type AuthenticatedStackParamList = {
  Dashboard: undefined;
  SaleDetails: undefined;
  InsertSale: undefined;
  SalesMap: undefined;
};

export type NonAuthenticatedScreenProps<
  T extends keyof NonAuthenticatedStackParamList,
> = NativeStackScreenProps<NonAuthenticatedStackParamList, T> & {
  theme: AppTheme;
};

export type AuthenticatedScreenProps<
  T extends keyof AuthenticatedStackParamList,
> = NativeStackScreenProps<AuthenticatedStackParamList, T> & {
  theme: AppTheme;
};

export type ScreensList<T> = {
  name: keyof T;
  component: FC<any>;
  options?: NativeStackNavigationOptions;
}[];
