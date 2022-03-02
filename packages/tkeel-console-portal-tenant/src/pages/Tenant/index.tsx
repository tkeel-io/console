import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Form, FormField } from '@tkeel/console-components';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import { isEnvDevelopment, setLocalUserInfo } from '@tkeel/console-utils';

import useTenantIdQueryMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTenantIdQueryMutation';

const mockData = isEnvDevelopment()
  ? { tenantTitle: String(PORTAL_GLOBALS?.mock?.tenantTitle) ?? '' }
  : { tenantTitle: '' };

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

  const navigate = useNavigate();
  const { config } = usePortalTenantConfigQuery();
  const pageConfig = config?.client?.pages?.Login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { isLoading, mutate } = useTenantIdQueryMutation({
    onSuccess: ({ data }) => {
      const { tenant_id: tenantId } = data;
      // @ts-ignore
      setLocalUserInfo({ tenant_id: tenantId });
      navigate(`/auth/login/${tenantId}`, { replace: true });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    let { tenantId = '' } = formValues;
    tenantId = tenantId.trim();

    if (!tenantId) {
      return;
    }

    mutate({ params: { title: tenantId } });
  };

  return (
    <Flex height="100vh" backgroundColor="white">
      <Box
        flex="1"
        paddingLeft="80px"
        backgroundImage={pageConfig?.backgroundImage}
        backgroundRepeat="no-repeat"
        backgroundSize="100% 100%"
      >
        <Heading
          marginTop="80px"
          fontWeight="600"
          fontSize="30px"
          lineHeight="42px"
          color="primary"
        >
          {pageConfig?.title}
        </Heading>
        <Heading
          marginTop="12px"
          fontSize="18px"
          lineHeight="24px"
          color="gray.100"
        >
          {pageConfig?.subTitle}
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
            label="租户空间"
            defaultValue={mockData.tenantTitle}
            placeholder="请输入您的租户空间"
            error={errors.tenantId}
            formControlStyle={{ width: '350px' }}
            formLabelStyle={formLabelStyle}
            inputStyle={inputStyle}
            registerReturn={register('tenantId', {
              required: { value: true, message: '请输入您的租户空间' },
            })}
          />
          <Box paddingTop="40px">
            <Button
              type="submit"
              colorScheme="primary"
              isFullWidth
              isLoading={isLoading}
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
