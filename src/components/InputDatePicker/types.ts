import type {ViewStyle} from 'react-native';

export interface InputDatePickerProps {
  label: string;
  onDateChange?: (date: Date) => void;
  resetDate?: () => void;
  containerStyle?: ViewStyle;
  value: Date;
}
