import type {FC} from 'react';
import React from 'react';
import {Image, Text, View} from 'react-native';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import type {NonAuthenticatedScreenProps} from '@navigation/types';

import useLogin from './useLogin';

const Login: FC<NonAuthenticatedScreenProps<'Login'>> = ({theme}) => {
  const {
    email,
    error,
    isLoading,
    styles,
    setEmail,
    setPassword,
    password,
    hasInternet,
    onLoginPress,
  } = useLogin(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://3.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlk/A_3ZXg7xO4YyGrKDhMpr6YRgrtOMn9tHwCLcBGAs/s1600/f_logo_RGB-Blue_1024.png ',
          }}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Bem-Vindo ao Magazine Azil</Text>
          <Text style={styles.headerSubtitle}>
            A maior distribuidora do Brasil!
          </Text>
        </View>
      </View>
      <View style={styles.inputsContainer}>
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          autoComplete="email"
          error={error}
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={error}
        />

        <View style={styles.buttonsContainer}>
          <Button
            label="Entrar"
            onPress={onLoginPress}
            disabled={!hasInternet}
            isLoading={isLoading}
          />
          <Button label="Esqueci minha senha" type="text" />
        </View>
      </View>
    </View>
  );
};

export default Login;
