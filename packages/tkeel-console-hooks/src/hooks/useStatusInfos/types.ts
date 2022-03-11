import { ReactNode } from 'react';

export type Statuses = 'info' | 'success' | 'warning' | 'error';

type Colors = {
  primary: string;
  secondary: string;
};

export interface StatusInfo {
  icon: ReactNode;
  colors: Colors;
}

export type StatusInfos = Record<Statuses, StatusInfo>;

export type StatusColors = Record<Statuses, { colors: Colors }>;
