// In App.js in a new project

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '@screens/Splash/SplashScreen';

import {useAuthContext} from '../contexts/AuthContext';

import AuthenticatedStackNavigator from './AuthenticatedStack';
import NonAuthenticatedStackNavigator from './NonAuthenticatedStack';

const AppStack = createNativeStackNavigator();

const Navigator = () => {
  const {user, isLoading} = useAuthContext();
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoading ? (
          <AppStack.Screen name="Splash" component={SplashScreen} />
        ) : user ? (
          <AppStack.Screen
            name="Authenticated"
            component={AuthenticatedStackNavigator}
          />
        ) : (
          <AppStack.Screen
            name="NonAuthenticated"
            component={NonAuthenticatedStackNavigator}
          />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
