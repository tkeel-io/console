import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import PlatformConfigItem, {
  Styles as PlatformConfigItemStyles,
} from '../PlatformConfigItem';
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
}

interface Config {
  tenantPlatformName: string;
  tenantLightLogo: string;
  tenantDarkLogo: string;
  adminPlatformName: string;
  adminLightLogo: string;
  adminDarkLogo: string;
}

interface Props {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

export default function PlatformConfig({ config, setConfig }: Props) {
  const [tenantLightLogo, setTenantLightLogo] = useState(
    config.tenantLightLogo
  );
  const [tenantDarkLogo, setTenantDarkLogo] = useState(config.tenantDarkLogo);

  const [adminLightLogo, setAdminLightLogo] = useState(config.adminLightLogo);
  const [adminDarkLogo, setAdminDarkLogo] = useState(config.adminDarkLogo);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PlatformConfigField>({
    defaultValues: {
      tenantPlatformName: config.tenantPlatformName,
      adminPlatformName: config.adminPlatformName,
    },
  });

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
      setConfig({
        tenantPlatformName,
        tenantLightLogo,
        tenantDarkLogo,
        adminPlatformName,
        adminLightLogo,
        adminDarkLogo,
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
    ({ title, logo, setLogo, styles }: LogoConfigItemProps) => {
      return (
        <PlatformConfigItem
          title={title}
          formField={
            <UploadInput type="rectangle" src={logo} setSrc={setLogo} />
          }
          styles={styles}
        />
      );
    },
    []
  );

  return (
    <Flex flexDirection="column">
      <Text {...titleStyle}>租户平台配置</Text>
      <PlatformNameConfigItem title="租户平台名称" id="tenantPlatformName" />
      <LogoConfigItem
        title="租户平台 Logo - 浅色版"
        logo={tenantLightLogo}
        setLogo={setTenantLightLogo}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        title="租户平台 Logo - 深色版"
        logo={tenantDarkLogo}
        setLogo={setTenantDarkLogo}
      />
      <Text {...titleStyle} marginTop="24px">
        管理平台配置
      </Text>
      <PlatformNameConfigItem title="管理平台名称" id="adminPlatformName" />
      <LogoConfigItem
        title="管理平台 Logo - 浅色版"
        logo={adminLightLogo}
        setLogo={setAdminLightLogo}
        styles={{ wrapper: { marginBottom: '16px' } }}
      />
      <LogoConfigItem
        title="管理平台 Logo - 深色版"
        logo={adminDarkLogo}
        setLogo={setAdminDarkLogo}
      />
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={handleReset}
        styles={{ wrapper: { marginTop: '34px' } }}
      />
    </Flex>
  );
}
