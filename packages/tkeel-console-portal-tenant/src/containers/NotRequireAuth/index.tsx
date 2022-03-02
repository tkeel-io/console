import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';

import useOAuthAuthenticateQuery from '@/tkeel-console-portal-tenant/hooks/queries/useOAuthAuthenticateQuery';

export default function NotRequireAuth() {
  const { isLoading, isSuccess } = useOAuthAuthenticateQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });

  const redirect = useRedirectParams();

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isSuccess) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}
