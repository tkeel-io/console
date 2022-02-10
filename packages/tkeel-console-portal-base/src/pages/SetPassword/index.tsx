import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Alert, Form, FormField, toast } from '@tkeel/console-components';
import { schemas } from '@tkeel/console-utils';

import useOAuthResetPasswordMutation from '@/tkeel-console-portal-base/hooks/mutations/useOAuthResetPasswordMutation';
import useResetPasswordKeyInfo from '@/tkeel-console-portal-base/hooks/queries/useResetPasswordKeyInfo';

const { TextField } = FormField;

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function SetPassword() {
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
  } = useForm<FormValues>();

  const [searchParams] = useSearchParams();
  const resetKey = searchParams.get('reset_key') ?? '';
  const { data: resetPasswordKeyInfo, isSuccess } = useResetPasswordKeyInfo({
    data: { reset_key: resetKey },
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

  const jumpToLoginPage = () => {
    const tenantId = resetPasswordData?.tenant_id ?? '';
    navigate(`/auth/login/${tenantId}`, { replace: true });
  };

  return (
    <>
      <Center flexDirection="column" height="100vh">
        <Box>
          <Heading
            as="h1"
            fontSize="48px"
            fontWeight="700"
            lineHeight="48px"
            color="gray.800"
          >
            欢迎您{username ? `，${username}！` : '！'}
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
              type="password"
              id="password"
              label="密码"
              placeholder="请输入"
              error={errors.password}
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
              placeholder="请输入"
              error={errors.confirmPassword}
              formControlStyle={{ marginBottom: '24px' }}
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
                isFullWidth
                width="350px"
                height="45px"
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
        onClose={jumpToLoginPage}
        onConfirm={jumpToLoginPage}
      />
    </>
  );
}
