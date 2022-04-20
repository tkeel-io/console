import { useMutation } from '@tkeel/console-hooks';
import { AuthConfigType } from '@tkeel/console-types';

interface RequestData {
  type: AuthConfigType;
  config: string;
}

interface ApiData {
  '@type': string;
}

export default function useAuthIdProviderRegisterMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/rudder/v1/oauth/id-provider/register',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
