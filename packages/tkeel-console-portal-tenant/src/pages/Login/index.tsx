import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import { jumpToTenantAuthTenantPage } from '@tkeel/console-utils';

import useTenantExactQuery from '@/tkeel-console-portal-tenant/hooks/queries/useTenantExactQuery';

import PasswordForm from './components/PasswordForm';
import ThirdPartyAuthForm from './components/ThirdPartyAuthForm';

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
  const { data: tenantInfo } = useTenantExactQuery({
    enabled: !!tenantId,
    params: { tenant_id: tenantId },
  });

  const navigate = useNavigate();

  if (!tenantId) {
    jumpToTenantAuthTenantPage({
      isReplace: true,
      navigate,
    });

    return null;
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
          {tenantInfo?.auth_type === 'internal' ? (
            <PasswordForm />
          ) : (
            <ThirdPartyAuthForm />
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
