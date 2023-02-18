import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '@screens/Login/Login';

import type {NonAuthenticatedStackParamList} from './types';

const NonAuthenticatedStack =
  createNativeStackNavigator<NonAuthenticatedStackParamList>();

const NonAuthenticatedStackNavigator = () => (
  <NonAuthenticatedStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <NonAuthenticatedStack.Screen name="Login" component={LoginScreen} />
  </NonAuthenticatedStack.Navigator>
);

export default NonAuthenticatedStackNavigator;
