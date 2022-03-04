import { Outlet, useLocation } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import {
  getNoAuthRedirectPath,
  jumpToAuthLoginPage,
  setLocalTenantInfo,
} from '@tkeel/console-utils';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

export default function RequireAuth() {
  const { data, isLoading, isError, isSuccess } = useAuthenticateTokenQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const location = useLocation();
  const redirectPath = getNoAuthRedirectPath({
    portalName: 'tenant',
    location,
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isError) {
    jumpToAuthLoginPage({
      portalName: 'tenant',
      path: redirectPath,
      isRemoveLocalTokenInfo: true,
      isReplace: true,
    });
    return null;
  }

  if (isSuccess && data?.tenant_id) {
    setLocalTenantInfo({ tenant_id: data.tenant_id });
  }

  return <Outlet />;
}
