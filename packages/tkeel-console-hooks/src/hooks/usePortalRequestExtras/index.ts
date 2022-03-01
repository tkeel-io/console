import { useNavigate } from 'react-router-dom';

import { createHandleNoAuth, getLocalTokenInfo } from '@tkeel/console-utils';

import useNoAuthRedirectPath from '../useNoAuthRedirectPath';

export default function usePortalRequestExtras() {
  const tokenInfo = getLocalTokenInfo();
  const navigate = useNavigate();
  const redirectPath = useNoAuthRedirectPath({
    portalName: PORTAL_GLOBALS.portalName,
  });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });

  return { tokenInfo, handleNoAuth };
}
