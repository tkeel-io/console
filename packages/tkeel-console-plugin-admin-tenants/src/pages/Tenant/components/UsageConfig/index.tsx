import { useParams } from 'react-router-dom';

import { Empty, Loading } from '@tkeel/console-components';

import useProfileDataQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileDataQuery';
import useProfileSchemaQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileSchemaQuery';
import type { Properties } from '@/tkeel-console-plugin-admin-tenants/types/usage-config';

import Form from './Form';

export default function UsageConfig() {
  const { tenantId = '' } = useParams();

  const { isLoading, schema } = useProfileSchemaQuery();
  const { isFetching, dataValues, refetch } = useProfileDataQuery({
    params: { tenant_id: tenantId },
  });

  if (isLoading || isFetching) {
    return <Loading isFullHeight />;
  }

  if (Object.keys((schema?.properties ?? {}) as Properties).length === 0) {
    return <Empty isFullHeight />;
  }

  return schema ? (
    <Form schema={schema} data={dataValues} refetchData={refetch} />
  ) : null;
}
