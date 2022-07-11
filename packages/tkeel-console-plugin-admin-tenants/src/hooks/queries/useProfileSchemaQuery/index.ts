import { useQuery } from '@tkeel/console-hooks';

import type { Schema } from '@/tkeel-console-plugin-admin-tenants/types/usage-config';

interface AipData {
  '@type': string;
  schema: Schema;
}

export default function useProfileSchemaQuery() {
  const result = useQuery<AipData>({
    url: '/rudder/v1/profile/schema',
    method: 'GET',
  });
  const schema = result.data?.schema;

  return { ...result, schema };
}
