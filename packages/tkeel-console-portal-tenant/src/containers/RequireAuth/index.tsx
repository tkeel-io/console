import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';
import { setLocalUserInfo, UserInfo } from '@tkeel/console-utils';

import useOAuthAuthenticateQuery from '@/tkeel-console-portal-tenant/hooks/queries/useOAuthAuthenticateQuery';

export default function RequireAuth() {
  const { data, isLoading, isError, isSuccess } = useOAuthAuthenticateQuery({
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

  if (isSuccess) {
    setLocalUserInfo(data as UserInfo);
  }

  return <Outlet />;
}
