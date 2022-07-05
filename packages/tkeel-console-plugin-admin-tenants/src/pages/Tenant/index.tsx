import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { CustomTab, CustomTabList } from '@tkeel/console-components';
import { useTenantQuery } from '@tkeel/console-request-hooks';

import BasicInfoCard from './components/BasicInfoCard';
import ThirdPartyAuth from './components/ThirdPartyAuth';
import UsageConfig from './components/UsageConfig';
import Users from './components/Users';

export default function Tenant() {
  const { tenantId = '' } = useParams();
  const { data } = useTenantQuery({ tenantId });
  const authType = data?.auth_type;
  const isExternal = authType === 'external';

  return (
    <Flex height="100%">
      <Box width="360px">
        <BasicInfoCard />
      </Box>
      <Tabs display="flex" flexDirection="column" marginLeft="20px" flex="1">
        <CustomTabList>
          <CustomTab>用户列表</CustomTab>
          {isExternal && <CustomTab>单点登录</CustomTab>}
          <CustomTab>用量配置</CustomTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderRadius="4px"
          backgroundColor="white"
        >
          <TabPanel height="100%" padding="0px 20px">
            <Users />
          </TabPanel>
          {isExternal && (
            <TabPanel height="100%" padding="0px 20px">
              <ThirdPartyAuth />
            </TabPanel>
          )}
          <TabPanel height="100%" padding="0px 20px">
            <UsageConfig />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
