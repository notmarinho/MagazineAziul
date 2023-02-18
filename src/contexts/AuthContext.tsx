import type {FC, PropsWithChildren} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';

import type User from '@models/User';
import {AuthService} from '@services/auth';
import {Storage} from '@store/storage';

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
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

      if (tokenOnStorage) {
        await AuthService.getSignedUser()
          .then(setUser)
          .catch(() => Storage.removeToken());
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

  return (
    <AuthContext.Provider
      value={{
        isDirector,
        isGeneralManager,
        isLoading,
        isManager,
        isSalesman,
        logout,
        setUser,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
