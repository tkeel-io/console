import { Navigate, Outlet } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { PlatformNames } from '@tkeel/console-constants';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';

import useAuth from '@/tkeel-console-portal-base/hooks/useAuth';

type Props = {
  platformName: PlatformNames;
};

export default function RequireAuth({ platformName }: Props) {
  const { isLoading, isError } = useAuth({
    platformName,
    extras: { handleNoAuth: false, handleApiError: false },
  });
  const redirectPath = useNoAuthRedirectPath();

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

  return <Outlet />;
}
