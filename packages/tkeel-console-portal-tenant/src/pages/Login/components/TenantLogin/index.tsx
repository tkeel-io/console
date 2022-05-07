import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';

import type { PortalTenantConfig } from '@tkeel/console-request-hooks';
import { AuthType } from '@tkeel/console-types';
import { jumpToTenantAuthTenantPage } from '@tkeel/console-utils';

import PasswordForm from './PasswordForm';
import ThirdPartyAuthForm from './ThirdPartyAuthForm';

const logoutTenant = () => {
  jumpToTenantAuthTenantPage({
    isRemoveLocalTenantInfo: true,
    isRemoveLocalTokenInfo: true,
    isReplace: true,
  });
};

interface Props {
  tenantInfo?: {
    auth_type: AuthType;
    title: string;
  };
  config?: PortalTenantConfig;
}

export default function TenantLogin({ tenantInfo, config }: Props) {
  const clientConfig = config?.client;
  const pageConfig = clientConfig?.pages?.Login;

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
