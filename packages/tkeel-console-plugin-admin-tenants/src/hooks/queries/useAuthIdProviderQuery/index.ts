import { useQuery } from '@tkeel/console-hooks';
import { IdProviderType } from '@tkeel/console-types';

interface AipData {
  '@type': string;
  type: IdProviderType;
  config: string;
}

interface Options {
  tenantId: string;
}

export default function useAuthIdProviderTemplateQuery({ tenantId }: Options) {
  return useQuery<AipData>({
    url: `/rudder/v1/oauth/id-provider/${tenantId}`,
    method: 'GET',
  });
}
