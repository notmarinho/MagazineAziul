import type {FC} from 'react';
import React from 'react';
import type {TextStyle, TouchableOpacityProps} from 'react-native';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {useTheme} from '@react-navigation/native';

import createStyles from './styles';
import type {ButtonType} from './types';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  type?: ButtonType;
  isLoading?: boolean;
  buttonLabelStyle?: TextStyle;
}

const Button: FC<ButtonProps> = ({
  isLoading = false,
  label,
  type = 'primary',
  style: customStyle,
  disabled,
  buttonLabelStyle,
  ...props
}) => {
  const theme = useTheme();
  const styles = createStyles({theme, type, disabled});
  return (
    <TouchableOpacity
      style={[styles.button, customStyle]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.onPrimary} />
      ) : (
        <Text style={[styles.buttonLabel, buttonLabelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
