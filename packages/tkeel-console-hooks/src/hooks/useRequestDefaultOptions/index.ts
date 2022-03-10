import { Location, useLocation } from 'react-router-dom';

import { DEFAULT_API_BASE_PATH } from '@tkeel/console-constants';
import { TokenInfo } from '@tkeel/console-types';
import {
  env,
  getGlobalPortalConfigCrossEnv,
  getLocalTokenInfo,
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
  plugin,
} from '@tkeel/console-utils';

function getBaseURL() {
  const globalPortalConfigCrossEnv = getGlobalPortalConfigCrossEnv();
  const api = globalPortalConfigCrossEnv?.backend.api;
  const origin = api?.origin ?? '';
  const basePath = api?.basePath ?? '';

  let baseURL = basePath;

  if (env.isEnvDevelopment()) {
    baseURL = `${origin}${basePath}`;
  }

  return baseURL ?? DEFAULT_API_BASE_PATH;
}

function getAxiosRequestConfig() {
  const baseURL = getBaseURL();
  return { baseURL };
}

function getExtras({ location }: { location: Location }) {
  let portalName: 'admin' | 'tenant';
  let basePath = '';
  let tokenInfo: TokenInfo;

  if (env.isPortal()) {
    portalName = GLOBAL_PORTAL_CONFIG.portalName;
    tokenInfo = getLocalTokenInfo();
  } else {
    const portalProps = plugin.getPortalProps();
    portalName = portalProps.portalName;
    basePath = GLOBAL_PLUGIN_CONFIG.client.basePath;
    tokenInfo = portalProps.client.tokenInfo;
  }

  const redirectPath = getNoAuthRedirectPath({
    portalName,
    basePath,
    location,
  });
  const handleNoAuth = () => {
    jumpToAuthLoginPage({
      portalName,
      path: redirectPath,
      isRemoveLocalTokenInfo: true,
      isReplace: true,
    });
  };
  return { tokenInfo, handleNoAuth };
}

export default function useRequestDefaultOptions() {
  const location = useLocation();

  const axiosRequestConfig = getAxiosRequestConfig();
  const extras = getExtras({ location });

  return { axiosRequestConfig, extras };
}
