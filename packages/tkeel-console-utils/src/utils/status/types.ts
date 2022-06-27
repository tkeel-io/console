import { FunctionComponent } from 'react';

import { TwoToneIconProps } from '@tkeel/console-icons';
import type { Theme } from '@tkeel/console-themes';

type StatusKeys = 'default' | 'info' | 'success' | 'warning' | 'error';

type Colors = {
  primary: string;
  secondary: string;
};

interface StatusInfo {
  icon: FunctionComponent<TwoToneIconProps>;
  colors: Colors;
}

export interface StatusInfos
  extends Record<Exclude<StatusKeys, 'default'>, StatusInfo> {
  default: {
    icon: null;
    colors: {
      primary: '';
      secondary: '';
    };
  };
}

export type GetStatusInfosOptions = Partial<Pick<Theme, 'colors'>>;
