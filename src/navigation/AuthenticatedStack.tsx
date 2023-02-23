import React from 'react';

import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from '@screens/Dashboard/Dashboard';
import InsertSaleScreen from '@screens/InsertSale/InsertSale';
import SaleDetailsScreen from '@screens/SaleDetails/SaleDetails';
import SalesMapScreen from '@screens/SalesMap/SalesMap';
import {useAppSelector} from '@store/redux';

import type {AuthenticatedStackParamList, ScreensList} from './types';
import {withTheme} from '.';

const AuthenticatedScreens: ScreensList<AuthenticatedStackParamList> = [
  {
    name: 'Dashboard',
    component: DashboardScreen,
  },
  {
    name: 'SaleDetails',
    component: SaleDetailsScreen,
  },
  {
    name: 'InsertSale',
    component: InsertSaleScreen,
  },
  {
    name: 'SalesMap',
    component: SalesMapScreen,
  },
];

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStackNavigator = () => {
  const user = useAppSelector(state => state.user.user);
  const isSalesman = user?.profile === 'salesman';
  const theme = useTheme();

  return (
    <AuthenticatedStack.Navigator
      initialRouteName={isSalesman ? 'Dashboard' : 'SalesMap'}
      screenOptions={{
        headerShown: false,
      }}>
      {AuthenticatedScreens.map(screen => (
        <AuthenticatedStack.Screen
          key={`@AuthenticatedStack-${screen.name}`}
          name={screen.name}
          component={withTheme(screen.component, theme)}
          options={screen.options}
        />
      ))}
    </AuthenticatedStack.Navigator>
  );
};

export default AuthenticatedStackNavigator;
