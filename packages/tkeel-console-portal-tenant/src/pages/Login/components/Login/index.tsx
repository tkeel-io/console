import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Loading } from '@tkeel/console-components';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import { jumpToPage, jumpToTenantAuthTenantPage } from '@tkeel/console-utils';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';
import useTenantExactQuery from '@/tkeel-console-portal-tenant/hooks/queries/useTenantExactQuery';

import PasswordForm from '../PasswordForm';
import ThirdPartyAuthForm from '../ThirdPartyAuthForm';

const logoutTenant = () => {
  jumpToTenantAuthTenantPage({
    isRemoveLocalTenantInfo: true,
    isRemoveLocalTokenInfo: true,
    isReplace: true,
  });
};

export default function Login() {
  const { config } = usePortalTenantConfigQuery();
  const clientConfig = config?.client;
  const pageConfig = clientConfig?.pages?.Login;

  const pathParams = useParams();
  const { tenantId = '' } = pathParams;
  const { data: tenantInfo, isLoading: isTenantExactQueryLoading } =
    useTenantExactQuery({
      enabled: !!tenantId,
      params: { tenant_id: tenantId },
    });

  const { state } = useLocation();
  const isAutoLogin = (state as { isAutoLogin: boolean })?.isAutoLogin ?? false;
  const { mutate, isError } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      jumpToPage({ path: data.redirect_url, isReplace: true });
    },
  });

  useEffect(() => {
    if (isAutoLogin && tenantInfo?.auth_type === 'external') {
      mutate({});
    }
  }, [isAutoLogin, tenantInfo?.auth_type, mutate]);

  if (isTenantExactQueryLoading) {
    return (
      <Center height="100vh">
        <Loading />
      </Center>
    );
  }

  if (isAutoLogin && tenantInfo?.auth_type === 'external' && !isError) {
    return (
      <Center height="100vh">
        <Loading />
      </Center>
    );
  }

  return (
    <Flex height="100vh" backgroundColor="white">
      <Box
        flex="1"
        paddingLeft="80px"
        backgroundImage={pageConfig?.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Heading
          marginTop="80px"
          fontWeight="600"
          fontSize="30px"
          lineHeight="42px"
          color="gray.100"
        >
          {pageConfig?.title}
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {clientConfig?.subTitle1}
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {clientConfig?.subTitle2}
        </Heading>
      </Box>
      <Center flexDirection="column" width="42vw">
        <Box width="350px">
          {tenantInfo?.auth_type === 'external' ? (
            <ThirdPartyAuthForm />
          ) : (
            <PasswordForm />
          )}
          <Button
            type="button"
            variant="outline"
            isFullWidth
            marginTop="12px"
            height="45px"
            borderRadius="4px"
            border="1px solid"
            borderColor="grayAlternatives.100"
            shadow="none"
            color="gray.600"
            backgroundColor="white"
            _hover={{
              backgroundColor: 'gray.50',
            }}
            onClick={() => logoutTenant()}
          >
            切换空间
          </Button>
        </Box>
      </Center>
    </Flex>
  );
}
