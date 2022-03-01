import { NavigateFunction } from 'react-router-dom';

import { TokenInfo } from './auth';

export interface PluginGlobalProps {
  container?: HTMLElement;
  portalName: 'admin' | 'tenant';
  tokenInfo: TokenInfo;
  navigate: NavigateFunction;
  themeName: string;
  theme: Record<string, unknown>;
  refetchMenus: () => void;
}
