import { Flex, StyleProps, Text } from '@chakra-ui/react';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import { FieldError, useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import type { PlatformConfig as PlatformConfigType } from '@tkeel/console-constants';
import { useDeletePortalConfigMutation } from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import LogoConfigItem from '../LogoConfigItem';
import PlatformConfigItem from '../PlatformConfigItem';

const { TextField } = FormField;

interface PlatformConfigField {
  tenantPlatformName: string;
  adminPlatformName: string;
}

type Platform = 'admin' | 'tenant';
interface PlatformNameConfigProps {
  platform: Platform;
  title: string;
  id: keyof PlatformConfigField;
}

interface UpdatePlatformConfigProps {
  platform: Platform;
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

  const PlatformNameConfigItem = useCallback(
    ({ platform, title, id }: PlatformNameConfigProps) => {
      return (
        <PlatformConfigItem
          title={title}
          showInformationIcon={false}
          formField={
            <TextField
              id={id}
              error={errors[id] as FieldError}
              registerReturn={register(id, {
                required: { value: true, message: `请输入${title}` },
                onBlur(e: ChangeEvent<HTMLInputElement>) {
                  updatePlatformConfig({
                    platform,
                    key: 'platformName',
                    value: e.target.value,
                  });
                },
              })}
            />
          }
        />
      );
    },
    [errors, register, updatePlatformConfig]
  );

  useEffect(() => {
    setValue('adminPlatformName', admin.platformName);
    setValue('tenantPlatformName', tenant.platformName);
  }, [admin, tenant, setValue]);

  return (
    <Flex flexDirection="column">
      <Text {...titleStyle}>租户平台配置</Text>
      <PlatformNameConfigItem
        platform="tenant"
        title="租户平台名称"
        id="tenantPlatformName"
      />
      <LogoConfigItem
        title="租户平台 Logo - 浅色版"
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
        title="租户平台 Logo - 深色版"
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
      <Text {...titleStyle} marginTop="24px">
        管理平台配置
      </Text>
      <PlatformNameConfigItem
        platform="admin"
        title="管理平台名称"
        id="adminPlatformName"
      />
      <LogoConfigItem
        title="管理平台 Logo - 浅色版"
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
        title="管理平台 Logo - 深色版"
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
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={() => mutate({})}
        styles={{ wrapper: { marginTop: '34px' } }}
      />
    </Flex>
  );
}