import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loading, toast } from '@tkeel/console-components';
import {
  jumpToPage,
  jumpToTenantAuthTenantPage,
  removeLocalTenantInfo,
  removeLocalTokenInfo,
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
  const { isLoading, isSuccess, userInfo } = useAuthenticateTokenQuery({
    extras: {
      tokenInfo,
      handleNoAuth: false,
      handleApiError(response) {
        const message = response?.data?.msg || '登录失败，请重新登录';
        toast(message, {
          status: 'error',
          onClose() {
            jumpToTenantAuthTenantPage({
              isRemoveLocalTokenInfo: true,
              isRemoveLocalTenantInfo: true,
              isReplace: true,
            });
          },
        });
      },
    },
  });

  useEffect(() => {
    removeLocalTenantInfo();
    removeLocalTokenInfo();
  }, []);

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

  return null;
}
