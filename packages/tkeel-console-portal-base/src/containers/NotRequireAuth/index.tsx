import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';

import useAuth from '@/tkeel-console-portal-base/hooks/useAuth';

export default function NotRequireAuth() {
  const { isLoading, isSuccess } = useAuth({
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
