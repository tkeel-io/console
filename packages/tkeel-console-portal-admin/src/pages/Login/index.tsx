import { Box, Button, Center, Flex, StyleProps } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  LoginBackground,
  LoginBrand,
} from '@tkeel/console-business-components';
import { Form, FormField } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { useConfigAppearanceQuery } from '@tkeel/console-request-hooks';
import {
  env,
  jumpToPage,
  schemas,
  setLocalTokenInfo,
} from '@tkeel/console-utils';

import useAdminTokenMutation from '@/tkeel-console-portal-admin/hooks/mutations/useAdminTokenMutation';

const mockData = env.isEnvDevelopment()
  ? { password: String(GLOBAL_PORTAL_CONFIG?.mock?.password ?? '') }
  : { password: '' };

const { TextField } = FormField;

type FormValues = {
  username: string;
  password: string;
};

const formLabelStyle: StyleProps = {
  marginBottom: '5px',
  fontSize: '14px',
  lineHeight: '20px',
  color: 'gray.700',
};

const inputStyle: StyleProps = {
  height: '50px',
  padding: '16px 20px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'grayAlternatives.50',
  borderRadius: '4px',
  backgroundColor: 'white',
  fontSize: '14px',
  lineHeight: '20px',
};

export default function Login() {
  const { config } = useConfigAppearanceQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const redirect = useRedirectParams();

  const { mutate, isLoading } = useAdminTokenMutation({
    onSuccess({ data }) {
      if (!data) {
        return;
      }

      setLocalTokenInfo(data);
      jumpToPage({ path: redirect, isReplace: true });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { password } = formValues;

    const params = {
      password: window.btoa(password),
    };

    mutate({ params });
  };

  return (
    <Flex height="100vh" backgroundColor="white">
      <LoginBackground
        backgroundImage={config?.common.backgroundImage}
        logo={
          config?.platform.admin[config?.common.backgroundImageLogo] as
            | string
            | undefined
        }
        sx={{ flex: 1 }}
      />
      <Center flexDirection="column" width="42vw">
        <Form width="350px" onSubmit={handleSubmit(onSubmit)}>
          <LoginBrand
            logo={config?.common.logoMark ?? ''}
            title="您好管理员，欢迎使用！"
            slogan={config?.common.slogan}
            styles={{ root: { paddingBottom: '24px' } }}
          />
          <TextField
            type="password"
            id="password"
            label="密码"
            defaultValue={mockData.password}
            placeholder="请输入您的密码"
            error={errors.password}
            formControlStyle={{ width: '350px' }}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
            registerReturn={register(
              'password',
              schemas.password.registerOptions
            )}
          />
          <Box paddingTop="40px">
            <Button
              type="submit"
              colorScheme="brand"
              width="full"
              height="45px"
              borderRadius="4px"
              shadow="none"
              isLoading={isLoading}
            >
              登录
            </Button>
          </Box>
        </Form>
      </Center>
    </Flex>
  );
}
