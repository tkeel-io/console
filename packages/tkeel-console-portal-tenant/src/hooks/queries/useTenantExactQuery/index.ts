import { usePortalQuery } from '@tkeel/console-hooks';

export interface RequestParams {
  tenant_id?: string;
  title?: string;
}

type ApiData = {
  '@type': string;
  tenant_id: string;
  title: string;
};

type Options = {
  enabled?: boolean;
  params: RequestParams;
};

export default function useTenantExactQuery({
  enabled = true,
  params,
}: Options) {
  return usePortalQuery<ApiData, RequestParams>({
    url: '/security/v1/tenants/exact',
    method: 'GET',
    params,
    reactQueryOptions: { enabled },
    extras: {
      handleNoAuth: false,
    },
  });
}
