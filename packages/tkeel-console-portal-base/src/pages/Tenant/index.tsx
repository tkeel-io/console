import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { Form, FormField } from '@tkeel/console-components';

import configs from '@/tkeel-console-portal-base/configs';

const { TextField } = FormField;

const config = configs[GLOBAL_CONFIG.client.themeName];
const pageConfig = config?.pages?.LoginTenant;

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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grayAlternatives.50',
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
    <Flex height="100vh" backgroundColor="white">
      <Box
        flex="1"
        paddingLeft="80px"
        backgroundImage={pageConfig.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="100% 100%"
      >
        <Heading
          marginTop="80px"
          font-weight="600"
          fontSize="30px"
          lineHeight="42px"
          color="primary"
        >
          {pageConfig.title}
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {pageConfig.description}
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
            您好，欢迎使用！
          </Heading>
          <TextField
            type="text"
            id="tenantId"
            label="租户 ID"
            defaultValue={String(GLOBAL_CONFIG?.mock?.tenantId ?? '')}
            placeholder="请输入您的租户 ID"
            error={errors.tenantId}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
            registerReturn={register('tenantId', {
              required: { value: true, message: '请输入您的租户 ID' },
            })}
          />
          <Box paddingTop="40px">
            <Button
              type="submit"
              colorScheme="primary"
              isFullWidth
              height="45px"
              borderRadius="4px"
              shadow="none"
            >
              下一步
            </Button>
          </Box>
        </Form>
      </Center>
    </Flex>
  );
}
