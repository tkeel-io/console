import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, FormField } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { usePortalAdminConfigPortalQuery } from '@tkeel/console-request-hooks';
import {
  isEnvDevelopment,
  jumpToPage,
  schemas,
  setLocalTokenInfo,
} from '@tkeel/console-utils';

import useAdminTokenMutation from '@/tkeel-console-portal-admin/hooks/mutations/useAdminTokenMutation';

const mockData = isEnvDevelopment()
  ? { password: String(PORTAL_GLOBALS?.mock?.password ?? '') }
  : { password: '' };

const { TextField } = FormField;

type FormValues = {
  username: string;
  password: string;
};

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

  const { config } = usePortalAdminConfigPortalQuery();
  const clientConfig = config?.client;
  const pageConfig = clientConfig?.pages.Login;

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
      <Box
        flex="1"
        paddingLeft="80px"
        backgroundImage={pageConfig?.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Heading
          display="flex"
          marginTop="80px"
          fontWeight="600"
          fontSize="30px"
          lineHeight="42px"
        >
          <Text color="primary">{pageConfig?.title}</Text>
          <Text color="primarySub3">{pageConfig?.additionalTitle}</Text>
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {clientConfig?.subTitle1}
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {clientConfig?.subTitle2}
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
            您好管理员，欢迎使用！
          </Heading>
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
