import {
  Box,
  Button,
  Divider,
  Flex,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import {
  IconButton,
  PageHeaderToolbar,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';
import { PencilTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import {
  AUTH_CONFIG_TYPES,
  DEFAULT_AUTH_CONFIG_TYPE_KEY,
} from '@/tkeel-console-plugin-admin-tenants/constants';
import { AuthConfigType } from '@/tkeel-console-plugin-admin-tenants/types';

import OIDC from './OIDC';

export default function ThirdPartyAuth() {
  const documents = plugin.getPortalDocuments();
  const [authConfigType, setAuthConfigType] = useState<AuthConfigType>(
    DEFAULT_AUTH_CONFIG_TYPE_KEY
  );
  const {
    isOpen: isOIDCModalOpen,
    onOpen: onOIDCModalOpen,
    onClose: onOIDCModalClose,
  } = useDisclosure();

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="第三方认证"
        hasSearchInput={false}
        styles={{ wrapper: { margin: '4px 0' } }}
      />
      <Divider />
      <Box paddingTop="20px" paddingBottom="16px">
        <Flex paddingBottom="16px">
          <Text fontSize="12px" lineHeight="140%" color="gray.500">
            用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。
          </Text>
          <Button
            fontSize="12px"
            lineHeight="140%"
            color="primary"
            variant="link"
            onClick={() => documents.open('')}
            // TODO: need doc
            display="none"
          >
            查看文档
          </Button>
        </Flex>
        <Tabs
          onChange={(index) => {
            const { key } = AUTH_CONFIG_TYPES[index];
            setAuthConfigType(key as AuthConfigType);
          }}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <SegmentedControlTabList>
              <SegmentedControlTab>OIDC</SegmentedControlTab>
              <SegmentedControlTab isDisabled>LDAP</SegmentedControlTab>
              <SegmentedControlTab isDisabled>SMAL</SegmentedControlTab>
            </SegmentedControlTabList>
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
                if (authConfigType === 'OIDC') {
                  onOIDCModalOpen();
                }
              }}
            >
              编辑
            </IconButton>
          </Flex>
          <TabPanels>
            <TabPanel padding="16px 0">
              <OIDC
                isModalOpen={isOIDCModalOpen}
                onModalClose={onOIDCModalClose}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
