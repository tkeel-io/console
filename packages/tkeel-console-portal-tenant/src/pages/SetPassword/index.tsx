import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  // Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Alert, Form, FormField, toast } from '@tkeel/console-components';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import { jumpToAuthLoginPage, schemas } from '@tkeel/console-utils';

import useSetPasswordMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useSetPasswordMutation';
import useResetPasswordKeyInfoQuery from '@/tkeel-console-portal-tenant/hooks/queries/useResetPasswordKeyInfoQuery';

const { TextField } = FormField;

type FormValues = {
  newPassword: string;
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

  const { config } = usePortalTenantConfigQuery();
  const clientConfig = config?.client;
  const pageConfig = clientConfig?.pages?.SetPassword;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset_key') ?? '';
  const { isSuccess } = useResetPasswordKeyInfoQuery({
    data: { reset_key: resetKey },
    enabled: !!resetKey,
  });

  const { isOpen, onOpen } = useDisclosure();
  const {
    data: resetPasswordData,
    mutate,
    isLoading,
  } = useSetPasswordMutation({
    onSuccess() {
      onOpen();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { newPassword, confirmPassword } = formValues;

    if (newPassword !== confirmPassword) {
      toast('两次输入的密码不一致', { status: 'warning' });
      return;
    }

    mutate({
      data: {
        reset_key: resetKey,
        new_password: newPassword,
      },
    });
  };

  const navigateToLoginPage = () => {
    const tenantId = resetPasswordData?.tenant_id ?? '';
    jumpToAuthLoginPage({
      portalName: 'tenant',
      tenantId,
      searchParams: {
        username: resetPasswordData?.username ?? '',
      },
      isRemoveLocalTokenInfo: false,
      isReplace: true,
    });
  };

  return (
    <>
      <Center
        position="relative"
        height="100vh"
        backgroundImage={pageConfig?.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="100% 40%"
      >
        <Box position="absolute" top="24px" left="20px">
          <Image src={pageConfig?.logo} width="auto" height="52px" />
        </Box>
        <Box
          padding="40px 46px 70px"
          marginBottom="100px"
          borderRadius="4px"
          backgroundColor="white"
        >
          <Heading color="gray.800" fontSize="24px" lineHeight="40px">
            设置密码
          </Heading>
          {/* <Heading fontSize="18px" lineHeight="28px" color="gray.900">
            欢迎您{username ? `，${username}！` : '！'}
          </Heading>
          <Text
            paddingTop="8px"
            fontSize="14px"
            lineHeight="20px"
            color="gray.500"
          >
            {clientConfig?.subTitle1}
          </Text>
          <Text
            paddingTop="8px"
            fontSize="14px"
            lineHeight="20px"
            color="gray.500"
          >
            {clientConfig?.subTitle2}
          </Text> */}
          <Form paddingTop="40px" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="password"
              id="password"
              label="新密码"
              help={schemas.password.help}
              placeholder="请输入"
              error={errors.newPassword}
              formControlStyle={{ width: '350px' }}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
              registerReturn={register(
                'newPassword',
                schemas.password.registerOptions
              )}
            />
            <TextField
              type="password"
              id="confirmPassword"
              label="再次输入新密码"
              help={schemas.password.help}
              placeholder="请输入"
              error={errors.confirmPassword}
              formControlStyle={{ width: '350px' }}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
              registerReturn={register(
                'confirmPassword',
                schemas.password.registerOptions
              )}
            />
            <Button
              marginTop="36px"
              type="submit"
              colorScheme="primary"
              isFullWidth
              height="45px"
              borderRadius="4px"
              shadow="none"
              isDisabled={!isSuccess}
              isLoading={isLoading}
            >
              登录
            </Button>
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
