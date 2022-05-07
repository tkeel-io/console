import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import { jumpToPage, jumpToTenantAuthTenantPage } from '@tkeel/console-utils';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';
import useTenantExactQuery from '@/tkeel-console-portal-tenant/hooks/queries/useTenantExactQuery';

import BaseLogin from './components/Login';

export default function Login() {
  const { tenantId = '' } = useParams();
  const navigate = useNavigate();

  const { data: tenantInfo, isLoading: isTenantQueryLoading } =
    useTenantExactQuery({
      enabled: !!tenantId,
      params: { tenant_id: tenantId },
    });

  const { state } = useLocation();
  const isAutoLogin = (state as { isAutoLogin: boolean })?.isAutoLogin ?? false;
  const { mutate, isError: isAutoLoginError } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      jumpToPage({ path: data.redirect_url, isReplace: true });
    },
  });

  const { config } = usePortalTenantConfigQuery();

  useEffect(() => {
    if (isAutoLogin && tenantInfo?.auth_type === 'external') {
      mutate({});
    }
  }, [isAutoLogin, tenantInfo?.auth_type, mutate]);

  if (!tenantId) {
    setTimeout(() => {
      jumpToTenantAuthTenantPage({
        isReplace: true,
        navigate,
      });
    });

    return null;
  }

  if (isTenantQueryLoading) {
    return (
      <Center height="100vh">
        <Loading />
      </Center>
    );
  }

  if (
    isAutoLogin &&
    tenantInfo?.auth_type === 'external' &&
    !isAutoLoginError
  ) {
    return (
      <Center height="100vh">
        <Loading />
      </Center>
    );
  }

  return <BaseLogin tenantInfo={tenantInfo} config={config} />;
}
