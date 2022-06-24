import { useParams } from 'react-router-dom';

import useProfileDataQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileDataQuery';
import useProfileSchemaQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileSchemaQuery';

import Form from './Form';

export default function UsageConfig() {
  const { tenantId = '' } = useParams();

  const { schema } = useProfileSchemaQuery();
  useProfileDataQuery({ params: { tenant_id: tenantId } });

  const data = {
    foo: 23,
    bar: 'abc',
  };

  return schema ? <Form schema={schema} data={data} /> : null;
}
