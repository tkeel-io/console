import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { Form, FormField } from '@tkeel/console-components';

const { TextField } = FormField;

type FormValues = {
  tenantId: string;
};

export default function Tenant() {
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

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    let { tenantId = '' } = formValues;
    tenantId = tenantId.trim();

    if (!tenantId) {
      return;
    }

    navigate(`/auth/login/${tenantId}`, { replace: true });
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
          <TextField
            type="text"
            id="tenantId"
            label="租户空间"
            value={String(GLOBAL_CONFIG?.mock?.tenantId ?? '')}
            placeholder="请输入您的租户空间"
            error={errors.tenantId}
            schemas={register('tenantId', {
              required: { value: true, message: 'required' },
            })}
            formControlStyle={{ marginBottom: '24px' }}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
          />
          <Box paddingTop="46px">
            <Button type="submit" isFullWidth height="45px">
              下一步
            </Button>
          </Box>
        </Form>
      </Box>
    </Center>
  );
}
