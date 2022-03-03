import { usePortalMutation } from '@tkeel/console-hooks';

export interface RequestParams {
  title: string;
}

type ApiData = {
  '@type': string;
  tenant_id: string;
  title: string;
};

type Options = {
  onSuccess: ({ data }: { data: ApiData }) => void;
};

export default function useQueryTenantIdMutation({ onSuccess }: Options) {
  return usePortalMutation<ApiData, RequestParams>({
    url: '/security/v1/tenants/exact',
    method: 'GET',
    reactQueryOptions: { onSuccess },
  });
}
