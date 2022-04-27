import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { LoginBrand } from '@tkeel/console-business-components';
import { Form, FormField } from '@tkeel/console-components';
import { useRedirectParams } from '@tkeel/console-hooks';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';
import {
  env,
  jumpToPage,
  jumpToTenantAuthTenantPage,
  schemas,
  setLocalTokenInfo,
} from '@tkeel/console-utils';

import useTokenMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useTokenMutation';
import useTenantExactQuery from '@/tkeel-console-portal-tenant/hooks/queries/useTenantExactQuery';

const mockData = env.isEnvDevelopment()
  ? {
      username: String(GLOBAL_PORTAL_CONFIG?.mock?.username ?? ''),
      password: String(GLOBAL_PORTAL_CONFIG?.mock?.password ?? ''),
    }
  : { username: '', password: '' };

const { TextField } = FormField;

type FormValues = {
  username: string;
  password: string;
};

const logoutTenant = () => {
  jumpToTenantAuthTenantPage({
    isRemoveLocalTenantInfo: true,
    isRemoveLocalTokenInfo: true,
    isReplace: true,
  });
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

  const { config } = usePortalTenantConfigQuery();
  const clientConfig = config?.client;
  const pageConfig = clientConfig?.pages?.Login;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initialUsername = searchParams.get('username') || '';

  const redirect = useRedirectParams();

  const { data: tenantInfo } = useTenantExactQuery({
    enabled: !!tenantId,
    params: { tenant_id: tenantId },
  });
  const tenantTitle = tenantInfo?.title ?? '';

  const { mutate, isLoading } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      if (!data) {
        return;
      }

      setLocalTokenInfo(data);
      jumpToPage({ path: redirect, isReplace: true });
    },
  });

  const { mutate: mutateSSO } = useTokenMutation({
    tenantId,
    onSuccess({ data }) {
      window.location.href = data.redirect_url;
    },
  });

  if (!tenantId) {
    jumpToTenantAuthTenantPage({
      isReplace: true,
      navigate,
    });

    return null;
  }

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { username, password } = formValues;
    const params = {
      grant_type: 'password' as const,
      username,
      password,
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
          marginTop="80px"
          fontWeight="600"
          fontSize="30px"
          lineHeight="42px"
          color="gray.100"
        >
          {pageConfig?.title}
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
        <Box width="350px">
          <LoginBrand
            alignItems="center"
            logo={clientConfig?.logoMark ?? ''}
            title="欢迎使用物联网平台"
            slogan="QingCloud IoT 物联网平台，颠覆传统物联网应用开发的新一代核心架构"
          />
          <Heading
            height="52px"
            paddingBottom="12px"
            fontSize="24px"
            fontWeight="600"
            lineHeight="40px"
            color="gray.800"
          >
            {tenantTitle}
          </Heading>
          <Form margin="0" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="username"
              type="text"
              label="账号"
              defaultValue={initialUsername || mockData.username}
              placeholder="请输入您的账号"
              error={errors.username}
              formControlStyle={{ marginBottom: '20px' }}
              formLabelStyle={formLabelStyle}
              inputStyle={inputStyle}
              registerReturn={register(
                'username',
                schemas.username.registerOptions
              )}
            />
            <TextField
              id="password"
              type="password"
              label="密码"
              defaultValue={mockData.password}
              placeholder="请输入您的密码"
              error={errors.password}
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
                colorScheme="brand"
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
          <Form
            margin="20px 0"
            onSubmit={(event) => {
              mutateSSO({});
              event.preventDefault();
            }}
          >
            <Button
              type="submit"
              colorScheme="brand"
              isFullWidth
              height="45px"
              borderRadius="4px"
              shadow="none"
              // isLoading={isLoading}
            >
              单点登录
            </Button>
          </Form>

          <Button
            type="button"
            variant="outline"
            isFullWidth
            marginTop="12px"
            height="45px"
            borderRadius="4px"
            border="1px solid"
            borderColor="grayAlternatives.100"
            shadow="none"
            color="gray.600"
            backgroundColor="white"
            _hover={{
              backgroundColor: 'gray.50',
            }}
            onClick={() => logoutTenant()}
          >
            切换空间
          </Button>
        </Box>
      </Center>
    </Flex>
  );
}
