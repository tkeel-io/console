import { Navigate, Outlet } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
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
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return <Navigate to={redirectPath} replace />;
  }

  if (platformName === PlatformNames.TENANT && isSuccess) {
    const {
      avatar,
      nick_name: nickName,
      tenant_id: tenantId,
      user_id: userId,
      username,
    } = data as UserInfo;
    setLocalUserInfo({
      avatar,
      nick_name: nickName,
      tenant_id: tenantId,
      user_id: userId,
      username,
    });
  }

  return <Outlet />;
}
