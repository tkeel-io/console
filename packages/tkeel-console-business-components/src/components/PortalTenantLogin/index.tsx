import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { noop } from 'lodash';

import PasswordForm from './PasswordForm';
import ThirdPartyAuthForm from './ThirdPartyAuthForm';
import type { TenantLoginProps } from './types';

export default function PortalTenantLogin({
  tenantInfo,
  config,
  isPasswordFormLoading,
  isThirdPartyAuthFormLoading,
  onLogoutTenantClick = noop,
  onPasswordFormSubmit = noop,
  onThirdPartyAuthFormSubmit = noop,
  mockData,
  styles,
}: TenantLoginProps) {
  return (
    <Flex height="100vh" backgroundColor="white" {...styles?.wrapper}>
      <Box
        flex="1"
        paddingTop="20px"
        paddingLeft="20px"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage={config?.common.backgroundImage}
      >
        <Box
          width="200px"
          height="200px"
          backgroundRepeat="no-repeat"
          backgroundSize="auto"
          backgroundImage={config?.platform.tenant.logoTypeLight}
        />
      </Box>
      <Center flexDirection="column" width="42%">
        <Box width="350px">
          {tenantInfo?.auth_type === 'external' ? (
            <ThirdPartyAuthForm
              tenantInfo={tenantInfo}
              config={config}
              isLoading={isThirdPartyAuthFormLoading}
              onSubmit={onThirdPartyAuthFormSubmit}
            />
          ) : (
            <PasswordForm
              tenantInfo={tenantInfo}
              config={config}
              isLoading={isPasswordFormLoading}
              onSubmit={onPasswordFormSubmit}
              mockData={mockData}
            />
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
            onClick={onLogoutTenantClick}
          >
            切换空间
          </Button>
        </Box>
      </Center>
    </Flex>
  );
}
