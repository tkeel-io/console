import type { NavigateFunction } from 'react-router-dom';

import type { Appearance } from './appearance';
import type { TenantInfo, TokenInfo } from './auth';
import type { UserDocumentsReturns } from './documents';
import type { ToastFunction } from './toast';

export interface GlobalPluginPropsPortalProps {
  portalName: 'admin' | 'tenant';
  client: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme: Record<string, any>;
    appearance: Appearance;
    tenantInfo: TenantInfo;
    tokenInfo: TokenInfo;
    toast: ToastFunction;
    documents: UserDocumentsReturns;
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

export interface BaseGlobalPluginProps {
  portalProps: GlobalPluginPropsPortalProps;
}

export interface GlobalPluginProps extends BaseGlobalPluginProps {
  name: string;
  container: HTMLElement;
}
