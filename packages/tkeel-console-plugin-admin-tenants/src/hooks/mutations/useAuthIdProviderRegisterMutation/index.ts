import { useMutation } from '@tkeel/console-hooks';
import { IdProviderType } from '@tkeel/console-types';

interface RequestData {
  type: IdProviderType;
  config: string;
}

interface ApiData {
  '@type': string;
}

interface Options {
  tenantId: string;
  onSuccess: () => void;
}

export default function useAuthIdProviderRegisterMutation({
  tenantId,
  onSuccess,
}: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `/rudder/v1/oauth/id-provider/register/${tenantId}`,
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
