import { SubmitHandler, useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { Form, FormField } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { setLocalTokenData } from '@tkeel/console-utils';

import useOAuthTokenMutation, {
  ApiData,
} from '@/tkeel-console-portal-base/hooks/mutations/useOAuthTokenMutation';

const { TextField } = FormField;

type Inputs = {
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

  setLocalTokenData(data);
  navigate(redirect);
}

function LoginTenant(): JSX.Element {
  const formLabelStyle = {
    marginBottom: '5px',
    fontSize: '14px',
    lineHeight: '20px',
    color: 'gray.700',
  };

  const inputStyle = {
    width: '350px',
    height: '50px',
    padding: '16px 20px',
    border: '1pxs solid gray.200',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '14px',
    lineHeight: '20px',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const pathParams = useParams();
  const navigate = useNavigate();
  const redirect = useRedirectParams();

  const { data, mutate, isLoading } = useOAuthTokenMutation();
  handleLogin({ data, redirect, navigate });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const { tenantId = '' } = pathParams;
    const { username, password } = values;
    const params = {
      grant_type: 'password' as const,
      username: `${tenantId}-${username}`,
      password,
    };

    mutate({ params });
  };

  return (
    <Center flexDirection="column" height="100vh">
      <Box>
        <Heading
          as="h1"
          fontSize="48px"
          fontWeight="700"
          lineHeight="48px"
          color="gray.800"
        >
          tKeel 平台
        </Heading>
        <Text
          paddingTop="12px"
          fontSize="14px"
          fontWeight="700"
          lineHeight="20px"
          color="gray.400"
        >
          tKeel，颠覆传统物联网应用开发的新一代核心架构
        </Text>
        <Form
          paddingTop="24px"
          paddingBottom="100px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            type="text"
            id="username"
            label="账号"
            value={String(GLOBAL_CONFIG?.mock?.username ?? '')}
            placeholder="请输入您的账号"
            error={errors.username}
            schemas={register('username', {
              required: { value: true, message: 'required' },
            })}
            formControlStyle={{ marginBottom: '24px' }}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
          />
          <TextField
            type="password"
            id="password"
            label="密码"
            value={String(GLOBAL_CONFIG?.mock?.password ?? '')}
            placeholder="请输入您的密码"
            error={errors.username}
            schemas={register('password', {
              required: { value: true, message: 'required' },
            })}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
          />
          <Box paddingTop="46px">
            <Button
              type="submit"
              isFullWidth
              height="45px"
              isLoading={isLoading}
            >
              登录
            </Button>
          </Box>
        </Form>
      </Box>
    </Center>
  );
}

export default LoginTenant;
