import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from '@screens/Dashboard/Dashboard';
import InsertSaleScreen from '@screens/InsertSale/InsertSale';
import SaleDetailsScreen from '@screens/SaleDetails/SaleDetails';
import SalesMapScreen from '@screens/SalesMap/SalesMap';
import {useAppSelector} from '@store/redux';

import type {AuthenticatedStackParamList} from './types';

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStackNavigator = () => {
  const user = useAppSelector(state => state.user.user);
  const isSalesman = user?.profile === 'salesman';
  return (
    <AuthenticatedStack.Navigator
      initialRouteName={isSalesman ? 'Dashboard' : 'SalesMap'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthenticatedStack.Screen name="Dashboard" component={DashboardScreen} />
      <AuthenticatedStack.Screen
        name="SaleDetails"
        component={SaleDetailsScreen}
      />
      <AuthenticatedStack.Screen
        name="InsertSale"
        component={InsertSaleScreen}
      />
      <AuthenticatedStack.Screen name="SalesMap" component={SalesMapScreen} />
    </AuthenticatedStack.Navigator>
  );
};

export default AuthenticatedStackNavigator;
