import { useLocation } from 'react-router-dom';

import { useGlobalPluginProps } from '@tkeel/console-business-components';
import {
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
} from '@tkeel/console-utils';

export default function usePluginRequestExtras() {
  const { portalName, tokenInfo } = useGlobalPluginProps();
  const location = useLocation();
  const { basePath } = GLOBAL_PLUGIN_CONFIG;
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
