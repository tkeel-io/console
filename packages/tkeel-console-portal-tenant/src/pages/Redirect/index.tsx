import { useSearchParams } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { jumpToPage } from '@tkeel/console-utils';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

export default function Redirect() {
  const [searchParams] = useSearchParams();
  const tokenType = searchParams.get('token_type') ?? '';
  const accessToken = searchParams.get('access_token') ?? '';
  const refreshToken = searchParams.get('refresh_token') ?? '';
  const expiresIn = Number(searchParams.get('expires_in') ?? 0);
  const tokenInfo = {
    token_type: tokenType,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  };
  const { isLoading, isSuccess } = useAuthenticateTokenQuery({
    extras: {
      tokenInfo,
      handleNoAuth: false,
    },
  });

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isSuccess) {
    jumpToPage({ path: '/', isReplace: true });
  }

  return null;
}
