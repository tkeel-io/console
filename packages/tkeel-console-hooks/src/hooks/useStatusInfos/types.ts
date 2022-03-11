import { ReactNode } from 'react';

export type StatusKeys = 'default' | 'info' | 'success' | 'warning' | 'error';

type Colors = {
  primary: string;
  secondary: string;
};

export interface StatusInfo {
  icon: ReactNode;
  colors: Colors;
}

export type StatusInfos = Record<StatusKeys, StatusInfo>;

export type StatusColors = Record<StatusKeys, Colors>;
