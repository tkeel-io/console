import {
  Flex,
  StyleProps,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';

import {
  CustomTab as CustomDetailTab,
  CustomTabList,
} from '@tkeel/console-components';
import type {
  CommonConfig as CommonConfigType,
  PlatformConfig as PlatformConfigType,
} from '@tkeel/console-constants';
import { APPEARANCE } from '@tkeel/console-constants';
import {
  usePortalConfigQuery,
  useUpdatePortalConfigMutation,
} from '@tkeel/console-request-hooks';

import adminMenuDark from '@/tkeel-console-plugin-admin-custom-config/assets/images/admin-menu-dark.svg';
import adminMenuLight from '@/tkeel-console-plugin-admin-custom-config/assets/images/admin-menu-light.svg';
import tenantMenuDark from '@/tkeel-console-plugin-admin-custom-config/assets/images/tenant-menu-dark.svg';
import tenantMenuLight from '@/tkeel-console-plugin-admin-custom-config/assets/images/tenant-menu-light.svg';

import BasicInfo from './components/BasicInfo';
import CommonConfig from './components/CommonConfig';
import CustomTab from './components/CustomTab';
import MenuPreview from './components/MenuPreview';
import PlatformConfig from './components/PlatformConfig';
import PreviewPanel from './components/PreviewPanel';

export default function AppearanceConfig() {
  const [commonConfig, setCommonConfig] = useState<CommonConfigType>({
    logoMark: '',
    slogan: '',
    backgroundImage: '',
  });

  const defaultPlatformConfig = {
    platformName: '',
    logoTypeLight: '',
    logoTypeDark: '',
  };

  const [platformConfig, setPlatformConfig] = useState<PlatformConfigType>({
    admin: defaultPlatformConfig,
    tenant: defaultPlatformConfig,
  });

  const { admin: adminConfig, tenant: tenantConfig } = platformConfig;

  usePortalConfigQuery<CommonConfigType>({
    path: 'config.common',
    onSuccess(data) {
      const COMMON_CONFIG = data?.data?.value || APPEARANCE.COMMON_CONFIG;
      if (COMMON_CONFIG) {
        setCommonConfig(COMMON_CONFIG);
      }
    },
  });

  usePortalConfigQuery<PlatformConfigType>({
    path: 'config.platform',
    defaultConfig: APPEARANCE.PLATFORM_CONFIG,
    onSuccess(data) {
      const PLATFORM_CONFIG = data?.data?.value || APPEARANCE.PLATFORM_CONFIG;
      if (PLATFORM_CONFIG) {
        setPlatformConfig(PLATFORM_CONFIG);
      }
    },
  });

  const { mutate: commonConfigMutate } =
    useUpdatePortalConfigMutation<CommonConfigType>({
      path: 'config.common',
      onSuccess() {
        window.location.reload();
      },
    });

  const { mutate: platformConfigMutate } =
    useUpdatePortalConfigMutation<PlatformConfigType>({
      path: 'config.platform',
      onSuccess() {
        window.location.reload();
      },
    });

  const tabPanelStyle: StyleProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '12px 20px',
    backgroundColor: 'white',
  };

  return (
    <Flex>
      <Flex flexDirection="column" width="360px" flexShrink={0}>
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
                  onConfirm={() => {
                    commonConfigMutate({
                      data: commonConfig,
                    });
                  }}
                />
              </TabPanel>
              <TabPanel height="100%" padding="0">
                <PlatformConfig
                  config={platformConfig}
                  setConfig={setPlatformConfig}
                  onConfirm={() => {
                    platformConfigMutate({
                      data: platformConfig,
                    });
                  }}
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
        index={1}
      >
        <CustomTabList>
          <CustomDetailTab borderTopLeftRadius="4px">
            登录欢迎页
          </CustomDetailTab>
          <CustomDetailTab>平台级配置</CustomDetailTab>
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
            <PreviewPanel>
              <Flex flex="1" justifyContent="space-between" padding="12px 32px">
                <MenuPreview
                  title="浅色/管理平台"
                  logo={adminConfig.logoTypeDark}
                  theme="light"
                  menu={adminMenuLight}
                />
                <MenuPreview
                  title="浅色/租户平台"
                  logo={tenantConfig.logoTypeDark}
                  theme="light"
                  menu={tenantMenuLight}
                />
                <MenuPreview
                  title="深色/管理平台"
                  logo={adminConfig.logoTypeLight}
                  menu={adminMenuDark}
                />
                <MenuPreview
                  title="深色/租户平台"
                  logo={tenantConfig.logoTypeLight}
                  menu={tenantMenuDark}
                />
              </Flex>
            </PreviewPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
