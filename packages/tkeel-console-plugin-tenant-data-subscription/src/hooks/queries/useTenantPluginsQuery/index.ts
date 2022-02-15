import { getLocalUserInfo } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'GET';

type RequestParams = {
  key_words?: string;
};

export interface ApiData {
  '@type': string;
  plugins: string[];
}

export default function useTenantPluginsQuery({
  params,
}: { params?: RequestParams } = {}) {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/tenants/${tenantId}/plugins`;

  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
  const plugins = data?.plugins ?? [];

  return { plugins, data, ...rest };
}
