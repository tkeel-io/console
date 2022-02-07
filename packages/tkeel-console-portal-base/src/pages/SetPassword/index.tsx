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

import useOAuthResetPasswordMutation from '@/tkeel-console-portal-base/hooks/mutations/useOAuthResetPasswordMutation';

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
  const tenantId = searchParams.get('tenant_id') ?? '';
  const userId = searchParams.get('user_id') ?? '';
  const username = searchParams.get('username') ?? '';

  const { isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const { mutate, isLoading } = useOAuthResetPasswordMutation({
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

    const data = {
      tenant_id: tenantId,
      user_id: userId,
      new_password: password,
    };

    mutate({ data });
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
              schemas={register('password', {
                required: { value: true, message: 'required' },
              })}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
            />
            <TextField
              type="password"
              id="confirmPassword"
              label="再次输入密码"
              placeholder="请输入"
              error={errors.confirmPassword}
              schemas={register('confirmPassword', {
                required: { value: true, message: 'required' },
              })}
              formControlStyle={{ marginBottom: '24px' }}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
            />
            <Box paddingTop="46px">
              <Button
                type="submit"
                isFullWidth
                height="45px"
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
        onClose={() => navigate('/auth/login', { replace: true })}
        onConfirm={() => navigate('/auth/login', { replace: true })}
      />
    </>
  );
}
