import type {FC, PropsWithChildren} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';

import type User from '@models/User';
import {AuthService} from '@services/auth';
import type {Menu} from '@services/types';
import {Storage} from '@store/storage';
import WMSalesActions from '@store/watermelon/action/SalesActions';

interface AuthContextProps {
  user: User | null;
  menu: Menu | null;
  onUserSignIn: (user: User) => void;
  setUserMenu: (menu: Menu) => void;
  logout: () => void;
  isGeneralManager: boolean;
  isDirector: boolean;
  isManager: boolean;
  isSalesman: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldSync, setShouldSync] = useState(true);
  const [hasInternet, setHasInternet] = useState(true);

  const isGeneralManager = user?.profile === 'general_manager';
  const isDirector = user?.profile === 'director';
  const isManager = user?.profile === 'manager';
  const isSalesman = user?.profile === 'salesman';

  const onAppStart = async () => {
    try {
      await Promise.all([handleUserSigned(), handleAppSync()]);
    } catch (error) {
      Storage.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSigned = async () => {
    try {
      const tokenOnStorage = await Storage.getToken();

      if (!tokenOnStorage) {
        return;
      }

      const hasInternet = await NetInfo.fetch().then(
        state => !!state.isConnected,
      );

      if (hasInternet) {
        return await AuthService.getSignedUser()
          .then(setUser)
          .catch(() => Storage.removeToken());
      }

      // If there is no internet connection, get user data from local storage
      const [userLocalData, userLocalMenu] = await Promise.all([
        Storage.getUserData(),
        Storage.getUserMenu(),
      ]);
      setUser(userLocalData);
      setMenu(userLocalMenu);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleAppSync = async () => {
    try {
      // Connection is back, sync local sales with server
      if (shouldSync && hasInternet && user) {
        WMSalesActions.syncLocalSalesWithServer()
          .then(response => setUserMenu(response.menu))
          .then(() => console.log('Synced! ✅'))
          .catch(error => console.log(`${error.message} 🚨`))
          .finally(() => setShouldSync(false));
      }

      // Connection is lost, set shouldSync to true
      if (!hasInternet && !shouldSync) {
        setShouldSync(true);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setUser(null);
    Storage.removeToken();
    Storage.removeUserMenu();
    setShouldSync(true);
  };

  const onUserSignIn = (nextUser: User) => {
    setUser(nextUser);
    Storage.setUserData(nextUser);
  };

  const setUserMenu = (nextMenu: Menu) => {
    setMenu(nextMenu);
    Storage.setUserMenu(nextMenu);
  };

  useEffect(() => {
    onAppStart();

    const unsubscribeNetInfo = NetInfo.addEventListener(state =>
      setHasInternet(!!state.isConnected),
    );

    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    if (user) {
      handleAppSync();
    }
  }, [hasInternet, shouldSync, user]);

  return (
    <AuthContext.Provider
      value={{
        isDirector,
        isGeneralManager,
        isLoading,
        isManager,
        isSalesman,
        logout,
        menu,
        setUserMenu,
        onUserSignIn,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
