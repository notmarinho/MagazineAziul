import type {FC} from 'react';
import React, {useEffect} from 'react';
import {Pressable, Text} from 'react-native';

import {useTheme} from '@react-navigation/native';

import useDatePicker from '@hooks/useDatePicker';

import createStyles from './styles';
import type {InputDatePickerProps} from './types';

const InputDatePicker: FC<InputDatePickerProps> = ({
  label,
  onDateChange,
  containerStyle,
  value = new Date(),
}) => {
  const [date, DatePickerModal, setOpen, setDate, formattedDate] =
    useDatePicker(value);

  const theme = useTheme();
  const styles = createStyles({
    theme,
  });

  useEffect(() => {
    onDateChange && onDateChange(date);
  }, [date]);

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.container, containerStyle]}>
        <Text style={styles.label} adjustsFontSizeToFit numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.date} adjustsFontSizeToFit numberOfLines={1}>
          {formattedDate}
        </Text>
      </Pressable>
      <DatePickerModal />
    </>
  );
};

export default InputDatePicker;
