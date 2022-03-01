import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';

import useOAuthAuthorizeQuery from '@/tkeel-console-portal-admin/hooks/queries/useOAuthAuthorizeQuery';

export default function RequireAuth() {
  const { isLoading, isError } = useOAuthAuthorizeQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const redirectPath = useNoAuthRedirectPath({
    portalName: GLOBAL_PORTAL_CONFIG.portalName,
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isError) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
