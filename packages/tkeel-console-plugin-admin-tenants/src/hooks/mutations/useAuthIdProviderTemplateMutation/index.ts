import { useMutation } from '@tkeel/console-hooks';

import { AuthConfigType } from '@/tkeel-console-plugin-admin-tenants/types';

interface RequestData {
  type: AuthConfigType;
  config: string;
}

interface ApiData {
  '@type': string;
}

export default function useOIDCRegisterMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/rudder/v1/oauth/id-provider/template',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
