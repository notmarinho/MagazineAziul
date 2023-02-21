import type {FC} from 'react';
import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import createStyle from './styles';
import type {InputProps} from './types';

const Input: FC<InputProps> = ({
  label = 'Label',
  style: customStyle,
  containerStyle,
  error,
  ...props
}) => {
  const theme = useTheme();
  const styles = createStyle({
    theme,
    error: !!error,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, customStyle]} {...props} />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
