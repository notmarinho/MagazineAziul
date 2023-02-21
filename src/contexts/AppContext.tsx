import type {FC, PropsWithChildren} from 'react';
import React, {createContext, useContext, useEffect, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';

import {useAppDispatch, useAppSelector} from '@store/redux';
import {initSales as syncSales} from '@store/redux/thunk/salesThunk';
import {initUser, signOut as signOutAction} from '@store/redux/thunk/userThunk';

interface AuthContextProps {
  signOut: () => void;
  hasInternet: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

const AppContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [shouldSync, setShouldSync] = useState(false);
  const [hasInternet, setHasInternet] = useState(true);

  const user = useAppSelector(state => state.user.user);

  const signOut = () => {
    dispatch(signOutAction());
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initUser());

    const unsubscribeNetInfo = NetInfo.addEventListener(state =>
      setHasInternet(!!state.isConnected),
    );

    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(syncSales());
    }
  }, [user, shouldSync, hasInternet]);

  useEffect(() => {
    if (!hasInternet && !shouldSync) {
      setShouldSync(true);
    }
  }, [hasInternet]);

  return (
    <AuthContext.Provider value={{signOut, hasInternet}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => useContext(AuthContext);

export default AppContextProvider;
