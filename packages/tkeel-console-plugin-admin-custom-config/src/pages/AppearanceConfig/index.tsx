import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

import {
  CustomTab as CustomDetailTab,
  CustomTabList,
} from '@tkeel/console-components';

import BasicInfo from './components/BasicInfo';
import CommonConfig from './components/CommonConfig';
import CustomTab from './components/CustomTab';
import PlatformConfig from './components/PlatformConfig';
import PreviewPanel from './components/PreviewPanel';

export default function AppearanceConfig() {
  const [commonConfig, setCommonConfig] = useState({
    logoMark: '',
    slogan: '',
    backgroundImage: '',
  });
  const [platformConfig, setPlatformConfig] = useState({
    tenantPlatformName: '',
    tenantLightLogo: '',
    tenantDarkLogo: '',
    adminPlatformName: '',
    adminLightLogo: '',
    adminDarkLogo: '',
  });
  // eslint-disable-next-line no-console
  console.log('AppearanceConfig ~ commonConfig', commonConfig);
  // eslint-disable-next-line no-console
  console.log('AppearanceConfig ~ platformConfig', platformConfig);

  const tabPanelStyle = {
    height: '100%',
    padding: '12px 20px',
    backgroundColor: 'white',
  };

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
                <CommonConfig
                  config={commonConfig}
                  setConfig={setCommonConfig}
                />
              </TabPanel>
              <TabPanel height="100%" padding="0">
                <PlatformConfig
                  config={platformConfig}
                  setConfig={setPlatformConfig}
                />
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
          <TabPanel {...tabPanelStyle}>
            <PreviewPanel>登录页</PreviewPanel>
          </TabPanel>
          <TabPanel {...tabPanelStyle}>
            <PreviewPanel>菜单</PreviewPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
