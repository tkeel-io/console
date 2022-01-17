import { Navigate, Outlet } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { PlatformNames } from '@tkeel/console-constants';
import { useRedirectParams } from '@tkeel/console-hooks';

import useAuth from '@/tkeel-console-portal-base/hooks/useAuth';

type Props = {
  platformName: PlatformNames;
};

export default function NotRequireAuth({ platformName }: Props) {
  const { isLoading, isSuccess } = useAuth({
    platformName,
    extras: { handleNoAuth: false, handleApiError: false },
  });

  const redirect = useRedirectParams();

  if (isLoading) {
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );
  }

  if (isSuccess) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
}
