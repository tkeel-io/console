import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { Form } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { setLocalTokenData } from '@tkeel/console-utils';

import useOAuthToken, {
  ApiData,
} from '@/tkeel-console-core/hooks/mutations/useOAuthToken';

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

function Login(): JSX.Element {
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

  const navigate = useNavigate();
  const redirect = useRedirectParams();

  const { data, mutate, isLoading } = useOAuthToken();
  handleLogin({ data, redirect, navigate });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    const { username, password } = values;
    const params = {
      grant_type: 'password' as const,
      username,
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
          <FormControl id="username" isInvalid={!!errors.username}>
            <FormLabel {...formLabelStyle}>账号</FormLabel>
            <Input
              type="text"
              placeholder="请输入您的账号"
              defaultValue={process.env.USERNAME}
              {...inputStyle}
              {...register('username', {
                required: { value: true, message: 'required' },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isInvalid={!!errors.password}
            paddingTop="24px"
          >
            <FormLabel {...formLabelStyle}>密码</FormLabel>
            <Input
              type="password"
              placeholder="请输入您的密码"
              defaultValue={process.env.PASSWORD}
              {...inputStyle}
              {...register('password', {
                required: { value: true, message: 'required' },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Box paddingTop="46px">
            <Button
              type="submit"
              colorScheme="blue"
              isFullWidth
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

export default Login;
