import { StyleProps, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { LoginBrand } from '@tkeel/console-business-components';
import { usePortalTenantConfigQuery } from '@tkeel/console-request-hooks';

import useTenantExactQuery from '@/tkeel-console-portal-tenant/hooks/queries/useTenantExactQuery';

type Props = {
  align?: 'center';
  styles?: {
    root?: StyleProps;
  };
};

export default function Brand({ align, styles }: Props) {
  const { config } = usePortalTenantConfigQuery();
  const clientConfig = config?.client;

  const pathParams = useParams();
  const { tenantId = '' } = pathParams;

  const { data: tenantInfo } = useTenantExactQuery({
    enabled: !!tenantId,
    params: { tenant_id: tenantId },
  });
  const tenantTitle = tenantInfo?.title ?? '';

  return (
    <LoginBrand
      align={align}
      logo={clientConfig?.logoMark ?? ''}
      title={
        <>
          您好，欢迎进入
          <Text display="inline" color="primary">
            {tenantTitle}
          </Text>
          ！
        </>
      }
      slogan={clientConfig?.slogan ?? ''}
      styles={styles}
    />
  );
}
