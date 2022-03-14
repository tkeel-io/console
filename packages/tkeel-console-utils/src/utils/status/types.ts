import { FunctionComponent } from 'react';

import { TwoToneIconProps } from '@tkeel/console-icons';
import { Theme } from '@tkeel/console-themes';

type StatusKeys = 'default' | 'info' | 'success' | 'warning' | 'error';

type Colors = {
  primary: string;
  secondary: string;
};

interface StatusInfo {
  icon: FunctionComponent<TwoToneIconProps> | null;
  colors: Colors;
}

export type StatusInfos = Record<StatusKeys, StatusInfo>;

export type GetStatusInfosOptions = Partial<Pick<Theme, 'colors'>>;
