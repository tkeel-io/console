import { useLocation } from 'react-router-dom';

import { TokenInfo } from '@tkeel/console-types';
import {
  env,
  getLocalTokenInfo,
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
  plugin,
} from '@tkeel/console-utils';

export default function useRequestExtras() {
  const location = useLocation();

  let portalName: 'admin' | 'tenant';
  let basePath = '';
  let tokenInfo: TokenInfo;

  if (env.isPortal()) {
    portalName = GLOBAL_PORTAL_CONFIG.portalName;
    tokenInfo = getLocalTokenInfo();
  } else {
    const globalPluginProps = plugin.getGlobalPluginProps();
    const portalProps = globalPluginProps?.portalProps;
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
