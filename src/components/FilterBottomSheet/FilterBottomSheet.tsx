import type {FC, ForwardRefRenderFunction} from 'react';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {Button, Text, View} from 'react-native';

import type {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import useDatePicker from '@hooks/useDatePicker';
import useDropDown from '@hooks/useDropDown';
import type {FilterSalesParams} from '@services/types';
import {useAppSelector} from '@store/redux';

interface FilterContentProps {
  onFilter: (filterParams: FilterSalesParams) => void;
}

const FilterContent: FC<FilterContentProps> = ({onFilter}) => {
  const menu = useAppSelector(state => state.sales.menu);

  const [DropDownBoard, board, setBoard] = useDropDown(menu?.boards, {
    zIndex: 3000,
    zIndexInverse: 1000,
    placeholder: 'Selecione um board',
  });

  const [DropDownSalesman, salesman, setSalesman] = useDropDown(
    menu?.salesman,
    {
      zIndex: 1000,
      zIndexInverse: 3000,
      placeholder: 'Selecione um vendedor',
    },
  );
  const [DropDownUnits, unit, setUnit] = useDropDown(menu?.units, {
    zIndex: 2000,
    zIndexInverse: 2000,
    placeholder: 'Selecione uma unidade',
  });

  const [
    initialDate,
    InitialDatePicker,
    setOpenInitialDate,
    setDateInitialDate,
    formattedInitialDate,
  ] = useDatePicker();
  const [
    finalDate,
    FinalDatePicker,
    setOpenFinalDate,
    setFinalDate,
    formattedFinalDate,
  ] = useDatePicker();

  const handleFilterPress = () => {
    onFilter({
      salesman: salesman ? salesman : undefined,
      unit: unit ? unit : undefined,
      board: board ? board : undefined,
      end_date: formattedFinalDate,
      start_date: formattedInitialDate,
    });
  };

  const handleClearPress = () => {
    setSalesman(null);
    setUnit(null);
    setBoard(null);
    onFilter({});
    setFinalDate(new Date());
    setDateInitialDate(new Date());
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
        gap: 10,
      }}>
      <DropDownBoard />
      <DropDownUnits />
      <DropDownSalesman />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>{formattedInitialDate}</Text>
          <Button
            title="Data inicial"
            onPress={() => setOpenInitialDate(true)}
          />
        </View>
        <View>
          <Text>{formattedFinalDate}</Text>
          <Button title="Data final" onPress={() => setOpenFinalDate(true)} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button title="Limpar" onPress={handleClearPress} />
        <Button title="Filter" onPress={handleFilterPress} />
      </View>
      <InitialDatePicker />
      <FinalDatePicker />
    </View>
  );
};

interface FilterBottomSheetProps {
  onFilter: (filterParams: FilterSalesParams) => void;
}

const FilterBottomSheet: ForwardRefRenderFunction<
  BottomSheet,
  FilterBottomSheetProps
> = ({onFilter}, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose>
      <FilterContent onFilter={onFilter} />
    </BottomSheet>
  );
};

export default forwardRef(FilterBottomSheet);
