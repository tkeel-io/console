import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import type { PlatformConfig as PlatformConfigType } from '@tkeel/console-constants';
import { useDeletePortalConfigMutation } from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import LogoConfigItem from '../LogoConfigItem';
import type { PlatformConfigField } from '../PlatformNameConfigItem';
import PlatformNameConfigItem from '../PlatformNameConfigItem';

interface UpdatePlatformConfigProps {
  platform: 'admin' | 'tenant';
  key: string;
  value: string;
}

interface Props {
  config: PlatformConfigType;
  setConfig: Dispatch<SetStateAction<PlatformConfigType>>;
  onConfirm: () => unknown;
}

export default function PlatformConfig({
  config,
  setConfig,
  onConfirm,
}: Props) {
  const { admin, tenant } = config;

  const { mutate } = useDeletePortalConfigMutation({
    path: 'config.platform',
    onSuccess() {
      window.location.reload();
    },
  });

  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<PlatformConfigField>();

  const titleStyle: StyleProps = {
    marginBottom: '12px',
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
  };

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      onConfirm();
    }
  };

  const updatePlatformConfig = useCallback(
    ({ platform, key, value }: UpdatePlatformConfigProps) => {
      setConfig({
        ...config,
        [platform]: {
          ...config[platform],
          [key]: value,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [admin, tenant]
  );

  useEffect(() => {
    setValue('adminPlatformName', admin.platformName);
    setValue('tenantPlatformName', tenant.platformName);
  }, [admin, tenant, setValue]);

  return (
    <Flex flexDirection="column">
      <Text {...titleStyle}>管理平台配置</Text>
      <PlatformNameConfigItem
        platform="admin"
        title="管理平台名称"
        id="adminPlatformName"
        error={errors.adminPlatformName as FieldError}
        register={register}
        updatePlatformConfig={updatePlatformConfig}
      />
      <LogoConfigItem
        title="管理平台 Logo - 深色版"
        logo={admin.logoTypeDark}
        updateLogo={(src) => {
          updatePlatformConfig({
            platform: 'admin',
            key: 'logoTypeDark',
            value: src,
          });
        }}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        title="管理平台 Logo - 浅色版"
        logo={admin.logoTypeLight}
        updateLogo={(src) => {
          updatePlatformConfig({
            platform: 'admin',
            key: 'logoTypeLight',
            value: src,
          });
        }}
        uploadInputStyles={{ wrapper: { backgroundColor: 'gray.800' } }}
      />
      <Text {...titleStyle} marginTop="24px">
        租户平台配置
      </Text>
      <PlatformNameConfigItem
        platform="tenant"
        title="租户平台名称"
        id="tenantPlatformName"
        error={errors.tenantPlatformName as FieldError}
        register={register}
        updatePlatformConfig={updatePlatformConfig}
      />
      <LogoConfigItem
        title="租户平台 Logo - 深色版"
        logo={tenant.logoTypeDark}
        updateLogo={(src) => {
          updatePlatformConfig({
            platform: 'tenant',
            key: 'logoTypeDark',
            value: src,
          });
        }}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        title="租户平台 Logo - 浅色版"
        logo={tenant.logoTypeLight}
        updateLogo={(src) => {
          updatePlatformConfig({
            platform: 'tenant',
            key: 'logoTypeLight',
            value: src,
          });
        }}
        uploadInputStyles={{ wrapper: { backgroundColor: 'gray.800' } }}
      />
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={() => mutate({})}
        styles={{ wrapper: { marginTop: '34px' } }}
      />
    </Flex>
  );
}
