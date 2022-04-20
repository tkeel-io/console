import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { IconButton, PageHeaderToolbar } from '@tkeel/console-components';
import { PencilTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useAuthIdProviderQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthIdProviderQuery';

import Config from './Config';
import CreateConfigButton from './CreateConfigButton';

export default function ThirdPartyAuth() {
  const { onOpen: onOIDCModalOpen } = useDisclosure();

  const { tenantId = '' } = useParams();
  const { data, refetch } = useAuthIdProviderQuery({ tenantId });
  const config = data?.config;

  return (
    <Flex flexDirection="column">
      <PageHeaderToolbar
        name="第三方认证"
        hasSearchInput={false}
        styles={{ wrapper: { margin: '4px 0' } }}
      />
      <Box padding="12px 0">
        {config ? (
          <>
            <IconButton
              marginLeft="24px"
              border="1px solid"
              borderColor="gray.200"
              backgroundColor="gray.50"
              fontSize="12px"
              fontWeight="20px"
              lineHeight="400"
              color="gray.800"
              variant="outline"
              colorScheme="gray"
              icon={<PencilTwoToneIcon size="16px" />}
              onClick={() => {
                onOIDCModalOpen();
              }}
            >
              编辑
            </IconButton>
            <Config />
          </>
        ) : (
          <Box borderRadius="4px" padding="12px" backgroundColor="gray.50">
            <CreateConfigButton
              onSuccess={() => {
                const toast = plugin.getPortalToast();
                toast.success('设置成功');
                refetch();
              }}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
}
