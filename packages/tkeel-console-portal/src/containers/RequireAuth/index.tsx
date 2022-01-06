import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { useNoAuthRedirectPath } from '@tkeel/console-hooks';

import useAuth from '@/tkeel-console-portal/hooks/useAuth';

export default function RequireAuth() {
  const { isLoading, isError } = useAuth({
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
