import { usePluginQuery } from '@tkeel/console-hooks';
import { getLocalUserInfo } from '@tkeel/console-utils';

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

  const { data, ...rest } = usePluginQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
  const plugins = data?.plugins ?? [];

  return { plugins, data, ...rest };
}
