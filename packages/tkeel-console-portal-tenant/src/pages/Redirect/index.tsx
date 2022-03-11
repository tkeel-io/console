import { stringify } from 'qs';
import { useSearchParams } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import {
  jumpToPage,
  jumpToTenantAuthTenantPage,
  setLocalTenantInfo,
  setLocalTokenInfo,
} from '@tkeel/console-utils';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

export default function Redirect() {
  const [searchParams] = useSearchParams();
  const tokenType = searchParams.get('token_type') ?? '';
  const accessToken = searchParams.get('access_token') ?? '';
  const refreshToken = searchParams.get('refresh_token') ?? '';
  const expiresIn = searchParams.get('expires_in') ?? '';
  const tokenInfo = {
    token_type: tokenType,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  };
  const { isLoading, isSuccess, isError, userInfo } = useAuthenticateTokenQuery(
    {
      queryKey: stringify(tokenInfo),
      extras: {
        tokenInfo,
        handleNoAuth: false,
      },
    }
  );

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (isSuccess) {
    const tenantInfo = { tenant_id: userInfo?.tenant_id ?? '' };
    const newTokenInfo = {
      ...tokenInfo,
      expires_in: userInfo?.expires_in ?? '',
    };
    setLocalTenantInfo(tenantInfo);
    setLocalTokenInfo(newTokenInfo);
    jumpToPage({ path: '/', isReplace: true });
  }

  if (isError) {
    jumpToTenantAuthTenantPage({
      isRemoveLocalTokenInfo: true,
      isRemoveLocalTenantInfo: true,
      isReplace: true,
    });
  }

  return null;
}
