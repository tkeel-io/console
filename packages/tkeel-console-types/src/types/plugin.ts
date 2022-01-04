import { NavigateFunction } from 'react-router-dom';

import { TokenData } from './auth';

export interface PluginGlobalProps {
  container?: HTMLElement;
  tokenData: TokenData;
  navigate: NavigateFunction;
  themeName: string;
  theme: Record<string, unknown>;
}
