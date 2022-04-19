import {
  Box,
  Button,
  Divider,
  Flex,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Base64 } from 'js-base64';

import {
  AceEditor,
  IconButton,
  PageHeaderToolbar,
  SegmentedControlTab,
  SegmentedControlTabList,
} from '@tkeel/console-components';
import { PencilTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useAuthTemplateQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useAuthTemplateQuery';

export default function ThirdPartyAuth() {
  const documents = plugin.getPortalDocuments();
  const { data } = useAuthTemplateQuery({ params: { type: 'OIDC' } });
  const config = data?.config ?? '';
  const yaml = Base64.decode(config);

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
        <Tabs>
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
            >
              编辑
            </IconButton>
          </Flex>
          <TabPanels>
            <TabPanel padding="16px 0">
              <AceEditor
                theme="light"
                value={yaml}
                language="yaml"
                readOnly
                height="256px"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
