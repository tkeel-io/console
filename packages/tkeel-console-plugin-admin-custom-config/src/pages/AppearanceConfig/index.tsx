import {
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import {
  CustomTab as CustomDetailTab,
  CustomTabList,
} from '@tkeel/console-components';

import BasicInfo from './components/BasicInfo';
import CommonConfig from './components/CommonConfig';
import CustomTab from './components/CustomTab';

export default function AppearanceConfig() {
  const tabPanelStyle = {
    height: '100%',
    padding: '12px 20px',
    backgroundColor: 'white',
  };

  const TabPanelTitle = (
    <Text color="gray.800" fontSize="14px" fontWeight="600" lineHeight="32px">
      效果预览
    </Text>
  );

  return (
    <Flex>
      <Flex flexDirection="column" width="360px">
        <BasicInfo />
        <Flex marginTop="12px" flexDirection="column" backgroundColor="white">
          <Tabs
            variant="unstyled"
            display="flex"
            overflowY="auto"
            flexDirection="column"
            flex="1"
          >
            <TabList
              display="flex"
              height="48px"
              paddingLeft="24px"
              borderBottom="none"
              backgroundColor="gray.50"
            >
              <CustomTab>通用配置</CustomTab>
              <CustomTab>平台级配置</CustomTab>
            </TabList>
            <TabPanels flex="1" padding="20px 24px">
              <TabPanel height="100%" padding="0">
                <CommonConfig />
              </TabPanel>
              <TabPanel height="100%" padding="0">
                2
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Tabs
        display="flex"
        flexDirection="column"
        marginLeft="20px"
        flex="1"
        boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
      >
        <CustomTabList>
          <CustomDetailTab borderTopLeftRadius="4px">
            登录欢迎页
          </CustomDetailTab>
          <CustomDetailTab>左侧导航</CustomDetailTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <TabPanel {...tabPanelStyle}>{TabPanelTitle}1</TabPanel>
          <TabPanel {...tabPanelStyle}>{TabPanelTitle}2</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
