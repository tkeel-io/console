import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';

import useOAuthAuthorizeQuery from '@/tkeel-console-portal-admin/hooks/queries/useOAuthAuthorizeQuery';

export default function RequireAuth() {
  const { isLoading, isError } = useOAuthAuthorizeQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const redirectPath = useNoAuthRedirectPath({
    platformName: GLOBAL_CONFIG.platformName,
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isError) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
