import { useParams } from 'react-router-dom';

import useProfileDataMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useProfileDataMutation';
import useProfileDataQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileDataQuery';
import useProfileSchemaQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useProfileSchemaQuery';
import type { Data } from '@/tkeel-console-plugin-admin-tenants/types/usage-config';

import Form from './Form';

export default function UsageConfig() {
  const { tenantId = '' } = useParams();

  const { schema } = useProfileSchemaQuery();
  const { dataValues, refetch } = useProfileDataQuery({
    params: { tenant_id: tenantId },
  });

  const { mutate, isLoading: isSetLoading } = useProfileDataMutation({
    params: {
      tenant_id: tenantId,
    },
    onSuccess() {
      refetch();
    },
  });

  const handleSubmit = (formValues: Data) => {
    mutate({ data: { profiles: formValues } });
  };

  return schema ? (
    <Form
      schema={schema}
      data={dataValues}
      isLoading={isSetLoading}
      onSubmit={handleSubmit}
    />
  ) : null;
}
