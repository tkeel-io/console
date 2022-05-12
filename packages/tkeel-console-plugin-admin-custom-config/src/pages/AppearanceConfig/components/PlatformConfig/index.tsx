import { Flex, StyleProps, Text } from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldError, useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import type { PlatformConfig as PlatformConfigType } from '@tkeel/console-constants';

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

const handleReset = () => {};

interface PlatformNameItemProps {
  title: string;
  id: keyof PlatformConfigField;
}

interface LogoConfigItemProps {
  title: string;
  logo: string;
  setLogo: Dispatch<SetStateAction<string>>;
  styles?: PlatformConfigItemStyles;
  uploadInputStyles?: UploadStyles;
}

interface Props {
  config: PlatformConfigType;
  updateConfig: (config: PlatformConfigType) => unknown;
}

export default function PlatformConfig({ config, updateConfig }: Props) {
  const [tenantLightLogo, setTenantLightLogo] = useState('');
  const [tenantDarkLogo, setTenantDarkLogo] = useState('');

  const [adminLightLogo, setAdminLightLogo] = useState('');
  const [adminDarkLogo, setAdminDarkLogo] = useState('');

  const {
    register,
    trigger,
    getValues,
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
      const { tenantPlatformName, adminPlatformName } = getValues();
      updateConfig({
        admin: {
          platformName: adminPlatformName,
          logoTypeLight: adminLightLogo,
          logoTypeDark: adminDarkLogo,
        },
        tenant: {
          platformName: tenantPlatformName,
          logoTypeLight: tenantLightLogo,
          logoTypeDark: tenantDarkLogo,
        },
      });
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

  const LogoConfigItem = useCallback(
    ({
      title,
      logo,
      setLogo,
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
              setSrc={setLogo}
              styles={uploadInputStyles}
            />
          }
          styles={styles}
        />
      );
    },
    []
  );

  useEffect(() => {
    const { admin, tenant } = config;
    setAdminDarkLogo(admin.logoTypeDark);
    setAdminLightLogo(admin.logoTypeLight);
    setTenantDarkLogo(tenant.logoTypeDark);
    setTenantLightLogo(tenant.logoTypeLight);
    setValue('adminPlatformName', admin.platformName);
    setValue('tenantPlatformName', tenant.platformName);
  }, [config, setValue]);

  return (
    <Flex flexDirection="column">
      <Text {...titleStyle}>租户平台配置</Text>
      <PlatformNameConfigItem title="租户平台名称" id="tenantPlatformName" />
      <LogoConfigItem
        title="租户平台 Logo - 浅色版"
        logo={tenantDarkLogo}
        setLogo={setTenantDarkLogo}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        title="租户平台 Logo - 深色版"
        logo={tenantLightLogo}
        setLogo={setTenantLightLogo}
        uploadInputStyles={{ wrapper: { backgroundColor: 'gray.800' } }}
      />
      <Text {...titleStyle} marginTop="24px">
        管理平台配置
      </Text>
      <PlatformNameConfigItem title="管理平台名称" id="adminPlatformName" />
      <LogoConfigItem
        title="管理平台 Logo - 浅色版"
        logo={adminDarkLogo}
        setLogo={setAdminDarkLogo}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        title="管理平台 Logo - 深色版"
        logo={adminLightLogo}
        setLogo={setAdminLightLogo}
        uploadInputStyles={{ wrapper: { backgroundColor: 'gray.800' } }}
      />
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={handleReset}
        styles={{ wrapper: { marginTop: '34px' } }}
      />
    </Flex>
  );
}
