import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PortalTenantLogin } from '@tkeel/console-business-components';
import { Loading } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import {
  env,
  jumpToPage,
  jumpToTenantAuthTenantPage,
  setLocalTokenInfo,
} from '@tkeel/console-utils';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';
import useTenantExactQuery from '@/tkeel-console-portal-tenant/hooks/queries/useTenantExactQuery';

const mockData = env.isEnvDevelopment()
  ? {
      username: String(GLOBAL_PORTAL_CONFIG?.mock?.username ?? ''),
      password: String(GLOBAL_PORTAL_CONFIG?.mock?.password ?? ''),
    }
  : { username: '', password: '' };

const handleLogoutTenantClick = () => {
  jumpToTenantAuthTenantPage({
    isRemoveLocalTenantInfo: true,
    isRemoveLocalTokenInfo: true,
    isReplace: true,
  });
};

export default function Login() {
  const { tenantId = '' } = useParams();
  const navigate = useNavigate();

  const { data: tenantInfo, isLoading: isTenantQueryLoading } =
    useTenantExactQuery({
      enabled: !!tenantId,
      params: { tenant_id: tenantId },
    });
  const { config } = usePortalTenantConfigQuery();

  const { state } = useLocation();
  const isAutoLogin = (state as { isAutoLogin: boolean })?.isAutoLogin ?? false;

  const redirect = useRedirectParams();
  const { mutate: mutatePasswordAuth, isLoading: isPasswordAuthLoading } =
    useTokenMutation({
      tenantId,
      onSuccess({ data }) {
        if (!data) {
          return;
        }

        setLocalTokenInfo(data);
        jumpToPage({ path: redirect, isReplace: true });
      },
    });

  const {
    mutate: mutateThirdPartyAuth,
    isLoading: isThirdPartyAuthLoading,
    isError: isThirdPartyAuthError,
  } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      jumpToPage({ path: data.redirect_url, isReplace: true });
    },
  });

  const handlePasswordFormSubmit = (formValues: {
    username: string;
    password: string;
  }) => {
    const params = { grant_type: 'password' as const, ...formValues };
    mutatePasswordAuth({ params });
  };

  const handleThirdPartyAuthFormSubmit = () => {
    mutateThirdPartyAuth({});
  };

  useEffect(() => {
    if (isAutoLogin && tenantInfo?.auth_type === 'external') {
      mutateThirdPartyAuth({});
    }
  }, [isAutoLogin, tenantInfo?.auth_type, mutateThirdPartyAuth]);

  if (!tenantId) {
    setTimeout(() => {
      jumpToTenantAuthTenantPage({
        isReplace: true,
        navigate,
      });
    });

    return null;
  }

  if (
    isTenantQueryLoading ||
    (tenantInfo?.auth_type === 'external' &&
      isAutoLogin &&
      !isThirdPartyAuthError)
  ) {
    return (
      <Center height="100vh">
        <Loading />
      </Center>
    );
  }

  return (
    <PortalTenantLogin
      tenantInfo={tenantInfo}
      config={config}
      isPasswordFormLoading={isPasswordAuthLoading}
      isThirdPartyAuthFormLoading={isThirdPartyAuthLoading}
      onLogoutTenantClick={handleLogoutTenantClick}
      onPasswordFormSubmit={handlePasswordFormSubmit}
      onThirdPartyAuthFormSubmit={handleThirdPartyAuthFormSubmit}
      mockData={mockData}
    />
  );
}
