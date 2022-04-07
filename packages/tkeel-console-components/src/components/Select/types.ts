import { SelectProps as RCSelectProps } from 'rc-select';

export interface SelectStyles {
  select?: string;
  selector?: string;
  selectionSearch?: string;
  selectionItem?: string;
  arrow?: string;
  dropdown?: string;
  selectItem?: string;
  itemOptionState?: string;
}

export interface SelectExtrasProps {
  styles?: SelectStyles;
}

export interface SelectProps extends RCSelectProps, SelectExtrasProps {}
