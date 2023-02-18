import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardScreen from '@screens/Dashboard/Dashboard';
import SaleDetailsScreen from '@screens/SaleDetails/SaleDetails';

import type {AuthenticatedStackParamList} from './types';

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStackNavigator = () => (
  <AuthenticatedStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthenticatedStack.Screen name="Dashboard" component={DashboardScreen} />
    <AuthenticatedStack.Screen
      name="SaleDetails"
      component={SaleDetailsScreen}
    />
  </AuthenticatedStack.Navigator>
);

export default AuthenticatedStackNavigator;
