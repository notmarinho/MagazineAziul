import type {FC, PropsWithChildren} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';

import type User from '@models/User';
import {AuthService} from '@services/auth';
import {Storage} from '@store/storage';

interface AuthContextProps {
  user: User | null;
  onUserSignIn: (user: User) => void;
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
  const [isLoading, setIsLoading] = useState(false);

  const isGeneralManager = user?.profile === 'general_manager';
  const isDirector = user?.profile === 'director';
  const isManager = user?.profile === 'manager';
  const isSalesman = user?.profile === 'salesman';

  useEffect(() => {
    onAppStart();
  }, []);

  const onAppStart = async () => {
    try {
      setIsLoading(true);
      const tokenOnStorage = await Storage.getToken();
      const userLocalData = await Storage.getUserData();

      if (tokenOnStorage) {
        const hasInternet = await NetInfo.fetch().then(
          state => !!state.isConnected,
        );

        hasInternet
          ? await AuthService.getSignedUser()
              .then(setUser)
              .catch(() => Storage.removeToken())
          : setUser(userLocalData);
      }
    } catch (error) {
      Storage.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Storage.removeToken();
  };

  const onUserSignIn = (user: User) => {
    setUser(user);
    Storage.setUserData(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isDirector,
        isGeneralManager,
        isLoading,
        isManager,
        isSalesman,
        logout,
        onUserSignIn,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
