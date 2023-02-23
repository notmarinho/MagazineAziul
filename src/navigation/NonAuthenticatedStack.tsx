import React from 'react';

import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '@screens/Login/Login';

import type {NonAuthenticatedStackParamList, ScreensList} from './types';
import {withTheme} from '.';

const NonAuthenticatedScreens: ScreensList<NonAuthenticatedStackParamList> = [
  {
    name: 'Login',
    component: LoginScreen,
  },
];

const NonAuthenticatedStack =
  createNativeStackNavigator<NonAuthenticatedStackParamList>();

const NonAuthenticatedStackNavigator = () => {
  const theme = useTheme();
  return (
    <NonAuthenticatedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {NonAuthenticatedScreens.map(screen => (
        <NonAuthenticatedStack.Screen
          key={`@NonAuthenticatedStack-${screen.name}`}
          name={screen.name}
          component={withTheme(screen.component, theme)}
          options={screen.options}
        />
      ))}
    </NonAuthenticatedStack.Navigator>
  );
};

export default NonAuthenticatedStackNavigator;
