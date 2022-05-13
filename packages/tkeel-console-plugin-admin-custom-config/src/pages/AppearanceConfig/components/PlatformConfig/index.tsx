import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import type { PlatformConfig as PlatformConfigType } from '@tkeel/console-constants';
import { useDeletePortalConfigMutation } from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import PlatformConfigItem, {
  Styles as PlatformConfigItemStyles,
} from '../PlatformConfigItem';
import type { Styles as UploadStyles } from '../UploadInput';
import UploadInput from '../UploadInput';

const { TextField } = FormField;

interface PlatformConfigField {
  tenantPlatformName: string;
  adminPlatformName: string;
}

interface PlatformNameItemProps {
  title: string;
  id: keyof PlatformConfigField;
}

interface LogoConfigItemProps {
  platform: 'admin' | 'tenant';
  logoName: string;
  title: string;
  logo: string;
  styles?: PlatformConfigItemStyles;
  uploadInputStyles?: UploadStyles;
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

  const PlatformNameConfigItem = useCallback(
    ({ title, id }: PlatformNameItemProps) => {
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
              })}
            />
          }
        />
      );
    },
    [errors, register]
  );

  const updatePlatformConfig = useCallback(
    ({
      platform,
      key,
      value,
    }: {
      platform: 'admin' | 'tenant';
      key: string;
      value: string;
    }) => {
      if (platform === 'admin') {
        setConfig({
          tenant,
          admin: {
            ...admin,
            [key]: value,
          },
        });
      }

      if (platform === 'tenant') {
        setConfig({
          admin,
          tenant: {
            ...tenant,
            [key]: value,
          },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [admin, tenant]
  );

  const LogoConfigItem = useCallback(
    ({
      platform,
      logoName,
      title,
      logo,
      styles,
      uploadInputStyles,
    }: LogoConfigItemProps) => {
      return (
        <PlatformConfigItem
          title={title}
          formField={
            <UploadInput
              type="rectangle"
              src={logo}
              setSrc={(src) =>
                updatePlatformConfig({
                  platform,
                  key: logoName,
                  value: src,
                })
              }
              styles={uploadInputStyles}
            />
          }
          styles={styles}
        />
      );
    },
    [updatePlatformConfig]
  );

  useEffect(() => {
    setValue('adminPlatformName', admin.platformName);
    setValue('tenantPlatformName', tenant.platformName);
  }, [admin, tenant, setValue]);

  return (
    <Flex flexDirection="column">
      <Text {...titleStyle}>租户平台配置</Text>
      <PlatformNameConfigItem title="租户平台名称" id="tenantPlatformName" />
      <LogoConfigItem
        platform="tenant"
        logoName="logoTypeDark"
        title="租户平台 Logo - 浅色版"
        logo={tenant.logoTypeDark}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        platform="tenant"
        logoName="logoTypeLight"
        title="租户平台 Logo - 深色版"
        logo={tenant.logoTypeLight}
        uploadInputStyles={{ wrapper: { backgroundColor: 'gray.800' } }}
      />
      <Text {...titleStyle} marginTop="24px">
        管理平台配置
      </Text>
      <PlatformNameConfigItem title="管理平台名称" id="adminPlatformName" />
      <LogoConfigItem
        platform="admin"
        logoName="logoTypeDark"
        title="管理平台 Logo - 浅色版"
        logo={admin.logoTypeDark}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        platform="admin"
        logoName="logoTypeLight"
        title="管理平台 Logo - 深色版"
        logo={admin.logoTypeLight}
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
