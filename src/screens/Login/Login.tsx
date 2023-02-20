import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useAppContext} from '@contexts/AppContext';
import {useAppDispatch, useAppSelector} from '@store/redux';
import {signIn} from '@store/redux/thunk/userThunk';

import styles from './styles';

const Login = () => {
  const [email, setEmail] = useState('afonso.afancar@magazineaziul.com.br');
  const [password, setPassword] = useState('mudar123');

  const {hasInternet} = useAppContext();

  const dispatch = useAppDispatch();
  const {isSignInLoading} = useAppSelector(state => state.user);

  const onLoginPress = () => {
    if (!email) {
      return Alert.alert('Please enter email');
    }

    if (!password) {
      return Alert.alert('Please enter password');
    }

    dispatch(signIn({email, password}));
  };

  const handleDevLogin = (customEmail: string) => {
    dispatch(signIn({email: customEmail, password}));
  };

  const loginWithGeneralManager = () =>
    handleDevLogin('pele@magazineaziul.com.br');

  const loginWithDirector = () =>
    handleDevLogin('rogerio.ceni@magazineaziul.com.br');

  const loginWithManager = () =>
    handleDevLogin('deyverson.acosta@magazineaziul.com.br');

  const loginWithSalesman = () => handleDevLogin('breno@magazineaziul.com.br');

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          disabled={!hasInternet}
          onPress={onLoginPress}>
          {isSignInLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonLabel}>
              {hasInternet ? 'Login' : 'No Connection'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.DEV_BUTTON_CONTAINER}>
        <Button title="General Manager" onPress={loginWithGeneralManager} />
        <Button title="Director" onPress={loginWithDirector} />
        <Button title="Manager" onPress={loginWithManager} />
        <Button title="Salesman" onPress={loginWithSalesman} />
      </View>
    </View>
  );
};

export default Login;
