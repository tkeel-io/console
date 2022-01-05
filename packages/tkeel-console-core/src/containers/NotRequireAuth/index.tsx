import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { useRedirectParams } from '@tkeel/console-hooks';

import useAuth from '@/tkeel-console-core/hooks/useAuth';

export default function NotRequireAuth() {
  const { isLoading, isSuccess } = useAuth({
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
