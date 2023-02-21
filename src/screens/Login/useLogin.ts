import {useState} from 'react';
import {Alert, Keyboard} from 'react-native';

import {useTheme} from '@react-navigation/native';

import {useAppContext} from '@contexts/AppContext';
import {useAppDispatch, useAppSelector} from '@store/redux';
import {signIn} from '@store/redux/thunk/userThunk';

import createStyles from './styles';

const useLogin = () => {
  const [email, setEmail] = useState('afonso.afancar@magazineaziul.com.br');
  const [password, setPassword] = useState('mudar123');

  const theme = useTheme();
  const styles = createStyles({theme});
  const {hasInternet} = useAppContext();

  const dispatch = useAppDispatch();
  const {isSignInLoading, error} = useAppSelector(state => state.user);

  const onLoginPress = () => {
    if (!email) {
      return Alert.alert('Please enter email');
    }

    if (!password) {
      return Alert.alert('Please enter password');
    }

    Keyboard.dismiss();

    dispatch(signIn({email, password}));
  };

  return {
    email,
    isLoading: isSignInLoading,
    error,
    setEmail,
    setPassword,
    styles,
    hasInternet,
    password,
    onLoginPress,
  };
};

export default useLogin;