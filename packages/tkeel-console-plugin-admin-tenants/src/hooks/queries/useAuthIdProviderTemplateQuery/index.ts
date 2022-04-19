import { useQuery } from '@tkeel/console-hooks';

import { AuthConfigType } from '@/tkeel-console-plugin-admin-tenants/types';

interface RequestParams {
  type: AuthConfigType;
}

interface AipData {
  '@type': string;
  config: string;
}

interface Options {
  params: RequestParams;
}

export default function useAuthIdProviderTemplateQuery({ params }: Options) {
  return useQuery<AipData, RequestParams>({
    url: '/rudder/v1/oauth/id-provider/template',
    method: 'GET',
    params,
  });
}
