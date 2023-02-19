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

import {AuthService} from '@services/auth';
import {Storage} from '@store/storage';

import {useAuthContext} from '../../contexts/AuthContext';
import styles from './styles';

const Login = () => {
  const {onUserSignIn: handleUserOnContext} = useAuthContext();

  const [email, setEmail] = useState('afonso.afancar@magazineaziul.com.br');
  const [password, setPassword] = useState('mudar123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLoginPress = () => {
    if (!email) {
      return Alert.alert('Please enter email');
    }

    if (!password) {
      return Alert.alert('Please enter password');
    }

    setIsLoading(true);
    AuthService.loginWithEmail(email, password)
      .then(response => Storage.setToken(response.access_token))
      .then(AuthService.getSignedUser)
      .then(handleUserOnContext)
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleDevLogin = (customEmail: string) => {
    setIsLoading(true);
    AuthService.loginWithEmail(customEmail, password)
      .then(response => Storage.setToken(response.access_token))
      .then(AuthService.getSignedUser)
      .then(handleUserOnContext)
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
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
          onPress={onLoginPress}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonLabel}>Login</Text>
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
