import { Box, Button, Center, Heading, useDisclosure } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { LoginBackgroundLogo } from '@tkeel/console-business-components';
import { Alert, Form, FormField, toast } from '@tkeel/console-components';
import {
  useConfigAppearanceQuery,
  useRevokePortalTenantTokenMutation,
} from '@tkeel/console-request-hooks';
import { jumpToAuthLoginPage, schemas } from '@tkeel/console-utils';

import useSetPasswordMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useSetPasswordMutation';
import useResetPasswordKeyInfoQuery from '@/tkeel-console-portal-tenant/hooks/queries/useResetPasswordKeyInfoQuery';

const { TextField } = FormField;

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

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

export default function SetPassword() {
  const { config } = useConfigAppearanceQuery();
  const logo = config?.platform.tenant[config?.common.backgroundImageLogo] as
    | string
    | undefined;

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: resetPasswordData,
    mutate: setPasswordMutate,
    isLoading: isSetPasswordLoading,
  } = useSetPasswordMutation({
    onSuccess() {
      onOpen();
    },
  });

  const jumpToLoginPage = () => {
    const tenantId = resetPasswordData?.tenant_id ?? '';
    jumpToAuthLoginPage({
      portalName: 'tenant',
      tenantId,
      searchParams: {
        username: resetPasswordData?.username ?? '',
      },
      isReplace: true,
    });
  };
  const {
    tokenInfo,
    refreshToken,
    isLoading: isLogoutLoading,
    mutate: logoutMutate,
  } = useRevokePortalTenantTokenMutation({
    onSuccess() {
      jumpToLoginPage();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { newPassword, confirmPassword } = formValues;

    if (newPassword !== confirmPassword) {
      toast('??????????????????????????????', { status: 'warning' });
      return;
    }

    setPasswordMutate({
      data: {
        reset_key: resetKey,
        new_password: newPassword,
      },
    });
  };

  return (
    <>
      <Center position="relative" height="100%">
        <Box
          position="absolute"
          top="0"
          right="0"
          left="0"
          zIndex="-1"
          height="40%"
          paddingTop="20px"
          paddingLeft="20px"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundImage={config?.common.backgroundImage}
        >
          {logo && <LoginBackgroundLogo src={logo} />}
        </Box>
        <Box
          padding="40px 46px 70px"
          marginBottom="100px"
          borderRadius="4px"
          backgroundColor="white"
        >
          <Heading color="gray.800" fontSize="24px" lineHeight="40px">
            ????????????
          </Heading>
          <Form paddingTop="40px" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="password"
              id="password"
              label="?????????"
              help={schemas.password.help}
              placeholder="?????????"
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
              label="?????????????????????"
              help={schemas.password.help}
              placeholder="?????????"
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
              colorScheme="brand"
              width="full"
              height="45px"
              borderRadius="4px"
              shadow="none"
              isDisabled={!isSuccess}
              isLoading={isSetPasswordLoading}
            >
              ??????
            </Button>
          </Form>
        </Box>
      </Center>
      <Alert
        isOpen={isOpen}
        icon="success"
        iconPosition="left"
        title="??????????????????"
        hasCloseButton={false}
        hasCancelButton={false}
        isConfirmButtonLoading={isLogoutLoading}
        onClose={onClose}
        onConfirm={() => {
          if (tokenInfo && refreshToken) {
            logoutMutate({ data: { refresh_token: refreshToken } });
          } else {
            jumpToLoginPage();
          }
        }}
      />
    </>
  );
}
