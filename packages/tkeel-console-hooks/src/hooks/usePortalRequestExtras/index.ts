import { useLocation } from 'react-router-dom';

import {
  getLocalTokenInfo,
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
} from '@tkeel/console-utils';

export default function usePortalRequestExtras() {
  const tokenInfo = getLocalTokenInfo();
  const location = useLocation();
  const redirectPath = getNoAuthRedirectPath({
    portalName: GLOBAL_PORTAL_CONFIG.portalName,
    location,
  });
  const handleNoAuth = () => {
    jumpToAuthLoginPage({
      portalName: GLOBAL_PORTAL_CONFIG.portalName,
      path: redirectPath,
      isRemoveLocalTokenInfo: true,
      isReplace: true,
    });
  };

  return { tokenInfo, handleNoAuth };
}
