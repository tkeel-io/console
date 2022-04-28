import { Box, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Form, FormField } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import {
  env,
  jumpToPage,
  jumpToTenantAuthTenantPage,
  schemas,
  setLocalTokenInfo,
} from '@tkeel/console-utils';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';

import Brand from '../Brand';

const mockData = env.isEnvDevelopment()
  ? {
      username: String(GLOBAL_PORTAL_CONFIG?.mock?.username ?? ''),
      password: String(GLOBAL_PORTAL_CONFIG?.mock?.password ?? ''),
    }
  : { username: '', password: '' };

const { TextField } = FormField;

type FormValues = {
  username: string;
  password: string;
};

export default function PasswordForm() {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initialUsername = searchParams.get('username') || '';

  const redirect = useRedirectParams();

  const { mutate, isLoading } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      if (!data) {
        return;
      }

      setLocalTokenInfo(data);
      jumpToPage({ path: redirect, isReplace: true });
    },
  });

  if (!tenantId) {
    jumpToTenantAuthTenantPage({
      isReplace: true,
      navigate,
    });

    return null;
  }

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
    <Form marginBottom="0" onSubmit={handleSubmit(onSubmit)}>
      <Brand />
      <TextField
        id="username"
        type="text"
        label="账号"
        defaultValue={initialUsername || mockData.username}
        placeholder="请输入您的账号"
        error={errors.username}
        formControlStyle={{ marginTop: '24px', marginBottom: '20px' }}
        formLabelStyle={formLabelStyle}
        inputStyle={inputStyle}
        registerReturn={register('username', schemas.username.registerOptions)}
      />
      <TextField
        id="password"
        type="password"
        label="密码"
        defaultValue={mockData.password}
        placeholder="请输入您的密码"
        error={errors.password}
        formLabelStyle={formLabelStyle}
        inputStyle={inputStyle}
        registerReturn={register('password', schemas.password.registerOptions)}
      />
      <Box paddingTop="40px">
        <Button
          type="submit"
          colorScheme="brand"
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
  );
}
