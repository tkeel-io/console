import { Outlet } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { jumpToPage } from '@tkeel/console-utils';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

export default function RequireNoAuth() {
  const { isLoading, isSuccess } = useAuthenticateTokenQuery({
    extras: { handleNoAuth: false, handleApiError: false },
  });

  const redirect = useRedirectParams();

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isSuccess) {
    jumpToPage({ path: redirect, isReplace: true });
    return null;
  }

  return <Outlet />;
}
