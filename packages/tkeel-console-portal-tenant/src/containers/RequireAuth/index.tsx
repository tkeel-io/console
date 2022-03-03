import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';
import { setLocalTenantInfo } from '@tkeel/console-utils';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

export default function RequireAuth() {
  const { data, isLoading, isError, isSuccess } = useAuthenticateTokenQuery({
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

  if (isSuccess && data?.tenant_id) {
    setLocalTenantInfo({ tenant_id: data.tenant_id });
  }

  return <Outlet />;
}
