import type {TextInputProps, ViewStyle} from 'react-native/types';

import type {DefaultStyleParams} from '@theme/types';

export interface InputProps extends TextInputProps {
  label: string;
  containerStyle?: ViewStyle;
  error?: string | null;
}

export interface StyleParams extends DefaultStyleParams {
  error?: boolean;
}
