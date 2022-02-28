import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { PlatformNames } from '@tkeel/console-constants';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';
import { setLocalUserInfo, UserInfo } from '@tkeel/console-utils';

import useAuth from '@/tkeel-console-portal-base/hooks/useAuth';
import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';

export default function RequireAuth() {
  const { platformName } = useGlobalProps();
  const { data, isLoading, isError, isSuccess } = useAuth({
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const redirectPath = useNoAuthRedirectPath({ platformName });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isError) {
    return <Navigate to={redirectPath} replace />;
  }

  if (platformName === PlatformNames.TENANT && isSuccess) {
    setLocalUserInfo(data as UserInfo);
  }

  return <Outlet />;
}
