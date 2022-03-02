import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Navigate,
  NavigateFunction,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { Form, FormField } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import { schemas, setLocalTokenInfo } from '@tkeel/console-utils';

import useOAuthTokenMutation, {
  ApiData,
} from '@/tkeel-console-portal-tenant/hooks/mutations/useOAuthTokenMutation';

const { TextField } = FormField;

type FormValues = {
  username: string;
  password: string;
};

function handleLogin({
  data,
  redirect,
  navigate,
}: {
  data: ApiData | undefined;
  redirect: string;
  navigate: NavigateFunction;
}) {
  if (!data) {
    return;
  }

  setLocalTokenInfo(data);
  navigate(redirect, { replace: true });
}

export default function Login() {
  const formLabelStyle = {
    marginBottom: '5px',
    fontSize: '14px',
    lineHeight: '20px',
    color: 'gray.700',
  };

  const inputStyle = {
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

  const { config } = usePortalTenantConfigQuery();
  const pageConfig = config?.client?.pages?.Login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const navigate = useNavigate();
  const redirect = useRedirectParams();

  const { data, mutate, isLoading } = useOAuthTokenMutation({ tenantId });

  if (!tenantId) {
    return <Navigate to="/auth/tenant" replace />;
  }

  handleLogin({ data, redirect, navigate });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { username, password } = formValues;
    const params = {
      grant_type: 'password' as const,
      username,
      password,
    };

    mutate({ params });
  };

  return (
    <Flex height="100vh" backgroundColor="white">
      <Box
        flex="1"
        paddingLeft="80px"
        backgroundImage={pageConfig?.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="100% 100%"
      >
        <Heading
          marginTop="80px"
          font-weight="600"
          fontSize="30px"
          lineHeight="42px"
          color="primary"
        >
          {pageConfig?.title}
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {pageConfig?.subTitle}
        </Heading>
      </Box>
      <Center flexDirection="column" width="42vw">
        <Form margin="0" onSubmit={handleSubmit(onSubmit)}>
          <Heading
            paddingBottom="12px"
            fontSize="24px"
            fontWeight="600"
            lineHeight="40px"
            color="gray.800"
          >
            您好，欢迎使用！
          </Heading>
          <TextField
            id="username"
            type="text"
            label="账号"
            defaultValue={String(PORTAL_GLOBALS?.mock?.username ?? '')}
            placeholder="请输入您的账号"
            error={errors.username}
            formControlStyle={{ marginBottom: '20px', width: '350px' }}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
            registerReturn={register(
              'username',
              schemas.username.registerOptions
            )}
          />
          <TextField
            id="password"
            type="password"
            label="密码"
            defaultValue={String(PORTAL_GLOBALS?.mock?.password ?? '')}
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
              colorScheme="primary"
              isFullWidth
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
