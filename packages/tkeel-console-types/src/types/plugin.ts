import { NavigateFunction } from 'react-router-dom';

import { TokenData } from './auth';

export interface PluginProps {
  container?: HTMLElement;
  tokenData: TokenData;
  navigate: NavigateFunction;
  themeName: string;
  theme: Record<string, unknown>;
}
