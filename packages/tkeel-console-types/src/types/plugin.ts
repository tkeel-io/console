import { NavigateFunction } from 'react-router-dom';

import { TokenInfo } from './auth';

export interface GlobalPluginProps {
  portalName: 'admin' | 'tenant';
  container?: HTMLElement;
  tokenInfo: TokenInfo;
  themeName: string;
  theme: Record<string, unknown>;
  navigate: NavigateFunction;
  refetchMenus: () => void;
}
