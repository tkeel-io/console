import { useLocation } from 'react-router-dom';

import {
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
  plugin,
} from '@tkeel/console-utils';

export default function usePluginRequestExtras() {
  const { portalProps } = plugin.getGlobalPluginProps();
  const { portalName, client } = portalProps;
  const { tokenInfo } = client;
  const location = useLocation();
  const redirectPath = getNoAuthRedirectPath({
    portalName,
    basePath: GLOBAL_PLUGIN_CONFIG.client.basePath,
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
