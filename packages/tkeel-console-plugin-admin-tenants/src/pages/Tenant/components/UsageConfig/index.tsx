import { useParams } from 'react-router-dom';

import useProfileDataQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileDataQuery';
import useProfileSchemaQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileSchemaQuery';

import Form from './Form';

export default function UsageConfig() {
  const { tenantId = '' } = useParams();

  const { schema } = useProfileSchemaQuery();
  const { dataValues, refetch } = useProfileDataQuery({
    params: { tenant_id: tenantId },
  });

  return schema ? (
    <Form schema={schema} data={dataValues} refetchData={refetch} />
  ) : null;
}
