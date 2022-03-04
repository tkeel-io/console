import { Outlet, useLocation } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import {
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
} from '@tkeel/console-utils';

import useAdminAuthenticateTokenQuery from '@/tkeel-console-portal-admin/hooks/queries/useAdminAuthenticateTokenQuery';

export default function RequireAuth() {
  const { isLoading, isError } = useAdminAuthenticateTokenQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const location = useLocation();
  const redirectPath = getNoAuthRedirectPath({
    portalName: 'admin',
    location,
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isError) {
    jumpToAuthLoginPage({
      portalName: 'admin',
      path: redirectPath,
      isRemoveLocalTokenInfo: true,
      isReplace: true,
    });
    return null;
  }

  return <Outlet />;
}
