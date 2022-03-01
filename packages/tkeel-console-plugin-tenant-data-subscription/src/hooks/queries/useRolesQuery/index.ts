import { usePluginQuery } from '@tkeel/console-hooks';
import { getLocalUserInfo } from '@tkeel/console-utils';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface ApiData {
  '@type': string;
  roles: string[];
}

export default function useRolesQuery({
  params,
}: { params?: RequestParams } = {}) {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/rbac/tenant/${tenantId}/roles`;
  const { data, ...rest } = usePluginQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
  const roles = data?.roles ?? [];

  return { roles, data, ...rest };
}
