import type {FC} from 'react';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native';

import {useTheme} from '@react-navigation/native';

import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import InputDatePicker from '@components/InputDatePicker/InputDatePicker';
import type {AuthenticatedScreenProps} from '@navigation/types';

import createStyles from './styles';
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
    setSelectedDate,
    selectedDate,
  } = useInsertSale();

  const theme = useTheme();
  const styles = createStyles({theme});

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Inserir Venda</Text>
          <Input
            label="Valor da Venda"
            value={saleValue}
            onChangeText={onSaleValueChange}
            autoFocus
            keyboardType="numeric"
          />
          <InputDatePicker
            label="Data da Venda"
            onDateChange={setSelectedDate}
            value={selectedDate}
          />
        </View>

        <Button label="Voltar" type="text" onPress={navigation.goBack} />

        <Button
          label={
            hasUserPosition ? 'Registrar Venda' : 'Sem acesso a localização'
          }
          isLoading={isLoading}
          disabled={!hasUserPosition}
          onPress={handleAddSale}
        />
      </View>
    </SafeAreaView>
  );
};

export default InsertSale;
