import type {FC} from 'react';
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import Button from '@components/Button/Button';
import FilterList from '@components/FilterList/FilterList';
import InputDatePicker from '@components/InputDatePicker/InputDatePicker';
import type {FilterSalesParams} from '@services/types';
import {useAppSelector} from '@store/redux';
import type {DefaultStyleParams} from '@theme/types';

interface FilterContentProps {
  onFilter: (filterParams: FilterSalesParams) => void;
}

const FilterContent: FC<FilterContentProps> = ({onFilter}) => {
  const menu = useAppSelector(state => state.sales.menu);
  const userProfile = useAppSelector(state => state.user?.user?.profile!);

  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedSalesman, setSelectedSalesman] = useState<string | null>(null);
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

  const theme = useTheme();
  const styles = createStyles({theme});

  const handleFilterPress = () => {
    onFilter({
      salesman: selectedSalesman ?? undefined,
      unit: selectedUnit ?? undefined,
      board: selectedBoard ?? undefined,
      end_date: finalDate,
      start_date: initialDate,
    });
  };

  const handleClearPress = () => {
    setFinalDate(new Date());
    setInitialDate(new Date());
    setSelectedSalesman(null);
    setSelectedUnit(null);
    setSelectedBoard(null);
    onFilter({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtros</Text>
      <View style={styles.filtersContainer}>
        {userProfile !== 'salesman' && (
          <FilterList
            data={menu?.boards}
            title="Boards"
            onSelectedChange={setSelectedBoard}
            value={selectedBoard}
          />
        )}
        {userProfile !== 'salesman' && (
          <FilterList
            data={menu?.units}
            title="Unidades"
            onSelectedChange={setSelectedUnit}
            value={selectedUnit}
          />
        )}
        {userProfile !== 'salesman' && (
          <FilterList
            data={menu?.salesman}
            title="Vendedores"
            onSelectedChange={setSelectedSalesman}
            value={selectedSalesman}
          />
        )}
        <View style={styles.datesContainer}>
          <InputDatePicker
            label="Dia Inicial"
            onDateChange={setInitialDate}
            value={initialDate}
          />
          <InputDatePicker
            label="Dia Final"
            onDateChange={setFinalDate}
            value={finalDate}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button label="Limpar" onPress={handleClearPress} type="text" />
        <Button label="Filtrar" onPress={handleFilterPress} />
      </View>
    </View>
  );
};

export default FilterContent;

const createStyles = ({theme: {colors}}: DefaultStyleParams) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingVertical: 10,
      flex: 1,
      paddingBottom: Platform.OS === 'ios' ? 40 : 0,
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      paddingHorizontal: 20,
      marginBottom: 10,
      color: colors.onBackground,
    },
    filtersContainer: {
      flex: 1,
      gap: 10,
    },
    datesContainer: {
      width: '100%',
      paddingHorizontal: 20,
      gap: 10,
    },
    buttonsContainer: {
      justifyContent: 'space-between',
      padding: 20,
    },
  });
