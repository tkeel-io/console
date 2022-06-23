import type { JSONSchemaType } from 'ajv';

import { useQuery } from '@tkeel/console-hooks';

interface MyData {
  [propName: string]: number | string;
}

interface AipData {
  '@type': string;
  profiles: {
    [propName: string]: JSONSchemaType<MyData>;
  };
}

export default function useProfileSchemaQuery() {
  const result = useQuery<AipData>({
    url: '/rudder/v1/profile/schema',
    method: 'GET',
  });
  const profiles = result.data?.profiles;

  return { ...result, profiles };
}
