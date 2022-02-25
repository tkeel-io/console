import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Alert, Form, FormField, toast } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import useOAuthResetPasswordMutation from '@/tkeel-console-portal-base/hooks/mutations/useOAuthResetPasswordMutation';
import useResetPasswordKeyInfoQuery from '@/tkeel-console-portal-base/hooks/queries/useResetPasswordKeyInfoQuery';

import configs from '@/tkeel-console-portal-base/configs';

const { TextField } = FormField;

const config = configs[GLOBAL_CONFIG.client.themeName];
const pageConfig = config?.pages?.SetPassword;

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function SetPassword() {
  const formLabelStyle = {
    marginBottom: '7px',
    fontSize: '14px',
    lineHeight: '24px',
    color: 'gray.700',
  };

  const inputStyle = {
    height: '40px',
    padding: '8px 12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grayAlternatives.50',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '14px',
    lineHeight: '24px',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset_key') ?? '';
  const { isSuccess, data: resetPasswordKeyInfo } =
    useResetPasswordKeyInfoQuery({
      data: { reset_key: resetKey },
      enabled: !!resetKey,
    });
  const username = resetPasswordKeyInfo?.username ?? '';

  const { isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const {
    data: resetPasswordData,
    mutate,
    isLoading,
  } = useOAuthResetPasswordMutation({
    onSuccess() {
      onOpen();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { password, confirmPassword } = formValues;

    if (password !== confirmPassword) {
      toast({ status: 'warning', title: '两次输入的密码不一致' });
      return;
    }

    mutate({
      data: {
        reset_key: resetKey,
        new_password: password,
      },
    });
  };

  const navigateToLoginPage = () => {
    const tenantId = resetPasswordData?.tenant_id ?? '';
    navigate(`/auth/login/${tenantId}`, { replace: true });
  };

  return (
    <>
      <Center
        position="relative"
        height="100vh"
        backgroundImage={pageConfig.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="100% 40%"
      >
        <Box position="absolute" top="24px" left="20px">
          <Heading
            display="inline"
            padding="2px"
            fontWeight="500"
            fontSize="14px"
            lineHeight="20px"
            backgroundColor="primary"
          >
            {pageConfig.brandName}
          </Heading>
          <Flex alignItems="center" paddingTop="4px" color="white">
            <Heading fontWeight="500" fontSize="18px" lineHeight="26px">
              {pageConfig.title}
            </Heading>
            <Text paddingX="8px" fontSize="18px">
              |
            </Text>
            <Heading fontSize="18px" lineHeight="28px">
              {pageConfig.subTitle}
            </Heading>
          </Flex>
        </Box>
        <Box
          padding="40px 46px 70px"
          marginBottom="100px"
          borderRadius="4px"
          backgroundColor="white"
        >
          <Heading fontSize="18px" lineHeight="28px" color="gray.900">
            欢迎您{username ? `，${username}！` : '！'}
          </Heading>
          <Text
            paddingTop="8px"
            fontSize="14px"
            lineHeight="20px"
            color="gray.500"
          >
            颠覆传统物联网应用开发的新一代核心架构
          </Text>
          <Form paddingTop="24px" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="password"
              id="password"
              label="密码"
              help={schemas.password.help}
              placeholder="请输入"
              error={errors.password}
              formControlStyle={{ width: '350px' }}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
              registerReturn={register(
                'password',
                schemas.password.registerOptions
              )}
            />
            <TextField
              type="password"
              id="confirmPassword"
              label="再次输入密码"
              help={schemas.password.help}
              placeholder="请输入"
              error={errors.confirmPassword}
              formControlStyle={{ marginBottom: '24px', width: '350px' }}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
              registerReturn={register(
                'confirmPassword',
                schemas.password.registerOptions
              )}
            />
            <Box paddingTop="46px">
              <Button
                type="submit"
                colorScheme="primary"
                width="76px"
                height="32px"
                isDisabled={!isSuccess}
                isLoading={isLoading}
              >
                确定
              </Button>
            </Box>
          </Form>
        </Box>
      </Center>
      <Alert
        isOpen={isOpen}
        icon="success"
        iconPosition="left"
        title="密码设置成功"
        hasCancelButton={false}
        onClose={navigateToLoginPage}
        onConfirm={navigateToLoginPage}
      />
    </>
  );
}
