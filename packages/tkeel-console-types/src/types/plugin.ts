import { NavigateFunction } from 'react-router-dom';

import { TokenInfo } from './auth';

export interface BaseGlobalPluginProps {
  portalName: 'admin' | 'tenant';
  client: {
    themeName: string;
    theme: Record<string, unknown>;
    tokenInfo: TokenInfo;
    navigate: NavigateFunction;
    refetchMenus: () => void;
  };
  backend: {
    api: {
      origin?: string;
      basePath: string;
    };
    websocket: {
      origin?: string;
      basePath: string;
    };
  };
}

export interface GlobalPluginProps extends BaseGlobalPluginProps {
  container: HTMLElement;
}
