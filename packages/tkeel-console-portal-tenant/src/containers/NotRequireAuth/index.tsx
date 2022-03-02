import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

export default function NotRequireAuth() {
  const { isLoading, isSuccess } = useAuthenticateTokenQuery({
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
