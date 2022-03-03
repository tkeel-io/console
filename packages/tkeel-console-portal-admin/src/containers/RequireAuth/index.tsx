import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';

import useAdminAuthenticateTokenQuery from '@/tkeel-console-portal-admin/hooks/queries/useAdminAuthenticateTokenQuery';

export default function RequireAuth() {
  const { isLoading, isError } = useAdminAuthenticateTokenQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const redirectPath = useNoAuthRedirectPath({
    portalName: PORTAL_GLOBALS.portalName,
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isError) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
