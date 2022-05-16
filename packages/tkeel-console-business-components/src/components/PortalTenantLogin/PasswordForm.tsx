import { Box, Button, StyleProps } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Form, FormField } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import Brand from './Brand';
import type { PasswordFormProps } from './types';

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

export default function PasswordForm({
  isLoading,
  onSubmit,
  mockData,
  ...rest
}: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [searchParams] = useSearchParams();
  const initialUsername = searchParams.get('username') || '';

  const submitHandler: SubmitHandler<FormValues> = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <Brand {...rest} styles={{ root: { paddingBottom: '24px' } }} />
      <TextField
        id="username"
        type="text"
        label="账号"
        defaultValue={initialUsername || mockData?.username}
        placeholder="请输入您的账号"
        error={errors.username}
        formControlStyle={{ marginBottom: '20px' }}
        formLabelStyle={formLabelStyle}
        inputStyle={inputStyle}
        registerReturn={register('username', schemas.username.registerOptions)}
      />
      <TextField
        id="password"
        type="password"
        label="密码"
        defaultValue={mockData?.password}
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
