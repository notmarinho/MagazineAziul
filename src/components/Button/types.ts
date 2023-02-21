import type {TextStyle, TouchableOpacityProps} from 'react-native/types';

import type {DefaultStyleParams} from '@theme/types';

export type ButtonType = 'primary' | 'secondary' | 'text' | 'outline';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  customLabelStyle?: TextStyle;
  type?: ButtonType;
  padding?: number;
}

export interface StyleParams extends DefaultStyleParams {
  type: ButtonType;
  disabled?: boolean;
}

export interface GetStyleParams {
  theme: StyleParams['theme'];
  type: StyleParams['type'];
}
