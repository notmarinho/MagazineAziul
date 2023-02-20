import type {FC} from 'react';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

import {format} from 'date-fns';

type useDatePickerReturn = [
  Date,
  FC,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<Date>>,
  string,
];

const useDatePicker = (initialDate = new Date()): useDatePickerReturn => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(initialDate);
  const formattedDate = format(date, 'dd-MM-yyyy');

  const DatePickerModal = () => (
    <DatePicker
      modal
      open={open}
      date={date}
      onConfirm={date => {
        setOpen(false);
        setDate(date);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      mode="date"
      androidVariant="iosClone"
    />
  );

  return [date, DatePickerModal, setOpen, setDate, formattedDate];
};

export default useDatePicker;
