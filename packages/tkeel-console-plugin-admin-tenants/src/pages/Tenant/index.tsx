import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { CustomTab, CustomTabList } from '@tkeel/console-components';

// import { HumanFilledIcon } from '@tkeel/console-icons';
import BasicInfoCard from './components/BasicInfoCard';
import Users from './components/Users';

export default function Tenant() {
  return (
    <Flex height="100%">
      <Box width="360px">
        <BasicInfoCard />
      </Box>
      <Tabs display="flex" flexDirection="column" marginLeft="20px" flex="1">
        <CustomTabList>
          <CustomTab>客户列表</CustomTab>
          {/* <CustomTab>第三方认证</CustomTab> */}
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderRadius="4px"
          backgroundColor="white"
        >
          <TabPanel height="100%">
            <Users />
          </TabPanel>
          {/* <TabPanel>
            <p>two!</p>
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
