import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/tkeel-console-core/hooks/useAuth';

export default function RequireAuth() {
  const { isLoading, data } = useAuth();

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
