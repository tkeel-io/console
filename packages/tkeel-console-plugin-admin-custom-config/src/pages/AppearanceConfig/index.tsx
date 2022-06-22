import {
  Box,
  Flex,
  StyleProps,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { PortalTenantLogin } from '@tkeel/console-business-components';
import {
  CustomTab as CustomDetailTab,
  CustomTabList,
} from '@tkeel/console-components';
import {
  useConfigAppearanceQuery,
  useUpdatePortalConfigMutation,
} from '@tkeel/console-request-hooks';
import type {
  CommonConfig as CommonConfigType,
  PlatformConfig as PlatformConfigType,
} from '@tkeel/console-themes';

import adminMenuDark from '@/tkeel-console-plugin-admin-custom-config/assets/images/admin-menu-dark.svg';
import adminMenuLight from '@/tkeel-console-plugin-admin-custom-config/assets/images/admin-menu-light.svg';
import tenantMenuDark from '@/tkeel-console-plugin-admin-custom-config/assets/images/tenant-menu-dark.svg';
import tenantMenuLight from '@/tkeel-console-plugin-admin-custom-config/assets/images/tenant-menu-light.svg';
import { imageToBase64 } from '@/tkeel-console-plugin-admin-custom-config/utils';

import BasicInfo from './components/BasicInfo';
import CommonConfig from './components/CommonConfig';
import CustomTab from './components/CustomTab';
import MenuPreview from './components/MenuPreview';
import PlatformConfig from './components/PlatformConfig';

export default function AppearanceConfig() {
  const [commonConfig, setCommonConfig] = useState<CommonConfigType>({
    logoMark: '',
    slogan: '',
    backgroundImage: '',
    backgroundImageLogo: '',
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

  const [loginWrapperWidth, setLoginWrapperWidth] = useState(0);
  const loginPreviewWrapperRef = useRef<HTMLDivElement>(null);

  const { admin: adminConfig, tenant: tenantConfig } = platformConfig;

  const { config: appearanceConfig, isSuccess } = useConfigAppearanceQuery();

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

  const handleCommonConfigConfirm = () => {
    const { logoMark, slogan, backgroundImage, backgroundImageLogo } =
      commonConfig;
    imageToBase64(backgroundImage)
      .then((res) => {
        return commonConfigMutate({
          data: {
            logoMark,
            slogan,
            backgroundImage: res,
            backgroundImageLogo,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleWindowResize = throttle(() => {
    if (loginPreviewWrapperRef.current) {
      setLoginWrapperWidth(loginPreviewWrapperRef.current.clientWidth);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    setTimeout(() => {
      handleWindowResize();
    }, 200);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const { common, platform } = appearanceConfig || {};
      if (common) {
        setCommonConfig(common);
      }
      if (platform) {
        setPlatformConfig(platform);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const previewPanelStyle: StyleProps = {
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'gray.100',
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
              <CustomTab>平台配置</CustomTab>
            </TabList>
            <TabPanels flex="1" padding="20px 24px">
              <TabPanel height="100%" padding="0">
                <CommonConfig
                  config={commonConfig}
                  setConfig={setCommonConfig}
                  onConfirm={handleCommonConfigConfirm}
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
      >
        <CustomTabList>
          <CustomDetailTab borderTopLeftRadius="4px" width="110px">
            通用配置预览
          </CustomDetailTab>
          <CustomDetailTab width="110px">平台配置预览</CustomDetailTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <TabPanel {...tabPanelStyle}>
            <Flex {...previewPanelStyle}>
              <Box width="100%" ref={loginPreviewWrapperRef}>
                {loginWrapperWidth !== 0 && (
                  <PortalTenantLogin
                    tenantInfo={{
                      auth_type: 'internal',
                      title: '管理平台',
                    }}
                    config={{
                      common: commonConfig,
                      platform: platformConfig,
                    }}
                    styles={{
                      wrapper: {
                        width: '100%',
                        minHeight: '550px',
                        height: `${(loginWrapperWidth / 1.77).toFixed(2)}px`,
                        transform: 'scale(.9)',
                      },
                    }}
                  />
                )}
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel {...tabPanelStyle}>
            <Flex {...previewPanelStyle}>
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
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
