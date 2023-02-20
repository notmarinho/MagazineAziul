import React from 'react';
import {useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '@screens/Splash/SplashScreen';
import {useAppSelector} from '@store/redux';
import darkTheme from '@theme/darkTheme';
import defaultTheme from '@theme/defaultTheme';

import AuthenticatedStackNavigator from './AuthenticatedStack';
import NonAuthenticatedStackNavigator from './NonAuthenticatedStack';

const AppStack = createNativeStackNavigator();

const Navigator = () => {
  const {user, isLoading} = useAppSelector(state => state.user);
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? darkTheme : defaultTheme;

  return (
    <NavigationContainer theme={theme}>
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
