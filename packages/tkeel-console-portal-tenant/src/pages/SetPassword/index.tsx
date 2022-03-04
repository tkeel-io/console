import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
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
  const pageConfig = config?.client?.pages?.SetPassword;

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
      toast({ status: 'warning', title: '两次输入的密码不一致' });
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
          <Image src={pageConfig?.logo} width="auto" height="50px" />
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
