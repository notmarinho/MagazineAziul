import type {Dispatch, FC, SetStateAction} from 'react';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

interface useDropDownProps {
  zIndex?: number;
  zIndexInverse?: number;
  placeholder?: string;
}

type useDropDownReturn = [
  FC,
  string | null,
  Dispatch<SetStateAction<string | null>>,
];

const useDropDown = (
  data: string[] = [],
  {
    zIndex = 1000,
    zIndexInverse = 1000,
    placeholder = 'Selecione um Item',
  }: useDropDownProps,
): useDropDownReturn => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  const DropDown = () => (
    <DropDownPicker
      open={open}
      value={value ?? null}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={value => setValue(value)}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
      placeholder={placeholder}
      dropDownContainerStyle={{
        maxHeight: 150,
      }}
    />
  );

  const formatData = (rawData: string[]) => {
    if (rawData.length > 0) {
      const formattedData = rawData.map(item => ({
        label: item,
        value: item,
      }));
      setItems(formattedData);
    }
  };

  useEffect(() => {
    formatData(data);
  }, [data]);

  return [DropDown, value, setValue];
};

export default useDropDown;
