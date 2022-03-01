import { useNavigate } from 'react-router-dom';

import { createHandleNoAuth } from '@tkeel/console-utils';

import useNoAuthRedirectPath from '../useNoAuthRedirectPath';

export default function usePortalHandleNoAuth() {
  const navigate = useNavigate();
  const redirectPath = useNoAuthRedirectPath({
    portalName: GLOBAL_PORTAL_CONFIG.portalName,
  });
  return createHandleNoAuth({ navigate, redirectPath });
}
