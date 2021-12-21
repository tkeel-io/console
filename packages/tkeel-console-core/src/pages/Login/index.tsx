import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
// import { request } from '@tkeel/console-utils';

type Inputs = {
  username: string;
  password: string;
};

/* (async () => {
  try {
    const response = await request({
      url: '/security/v1/oauth/token?grant_type1=password&username=2-demoadmin&password=123456',
      extras: {
        isShowErrorMessage: false,
      },
    });
    console.log('response', response);
  } catch {
    //
  }
})(); */

const onSubmit: SubmitHandler<Inputs> = (values) => {
  // eslint-disable-next-line no-console
  console.log(values);

  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

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
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

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
              isLoading={isSubmitting}
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
