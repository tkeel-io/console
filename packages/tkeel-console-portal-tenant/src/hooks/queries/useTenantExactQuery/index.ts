import { useQuery } from '@tkeel/console-hooks';
import { AuthType } from '@tkeel/console-types';

export interface RequestParams {
  tenant_id?: string;
  title?: string;
}

type ApiData = {
  '@type': string;
  auth_type: AuthType;
  tenant_id: string;
  title: string;
};

type Options = {
  enabled?: boolean;
  retryOnMount?: boolean;
  params: RequestParams;
};

export default function useTenantExactQuery({
  enabled = true,
  retryOnMount,
  params,
}: Options) {
  return useQuery<ApiData, RequestParams>({
    url: '/security/v1/tenants/exact',
    method: 'GET',
    params,
    reactQueryOptions: { enabled, retryOnMount },
    extras: {
      handleNoAuth: false,
    },
  });
}
