import type {FC} from 'react';
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type {AuthenticatedScreenProps} from '@navigation/types';

import styles from './styles';
import useInsertSale from './useInsertSale';

const InsertSale: FC<AuthenticatedScreenProps<'InsertSale'>> = ({
  navigation,
}) => {
  const {
    handleAddSale,
    hasUserPosition,
    isLoading,
    onSaleValueChange,
    saleValue,
  } = useInsertSale();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={saleValue}
          onChangeText={onSaleValueChange}
          autoFocus
          keyboardType="numeric"
          placeholder="Sale value"
        />
      </View>

      <Button title="Voltar" onPress={navigation.goBack} />
      <TouchableOpacity
        onPress={handleAddSale}
        style={hasUserPosition ? styles.button : styles.disabledButton}
        disabled={!hasUserPosition}>
        {isLoading ? (
          <ActivityIndicator animating />
        ) : (
          <Text
            style={styles.buttonLabel}
            adjustsFontSizeToFit
            numberOfLines={1}>
            {hasUserPosition
              ? 'Insert sale'
              : 'You need to allow location access to insert a sale'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InsertSale;
