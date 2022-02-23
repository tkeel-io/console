import { RequestResult } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-admin-tenants/hooks/useQuery';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface User {
  tenant_id: string;
  user_id: string;
  external_id?: string;
  username: string;
  email?: string;
  nick_name?: string;
  avatar?: string;
  created_at: string;
  roles: { id: string; name: string }[];
}

export interface ApiData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  users: User[];
}

type Args = {
  tenantId: string;
  params?: RequestParams;
  onSuccess?: (
    data: RequestResult<ApiData, RequestParams, undefined>
  ) => unknown;
};

export default function useUsersQuery({ tenantId, params, onSuccess }: Args) {
  const url = `/security/v1/tenants/${tenantId}/users`;

  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
    reactQueryOptions: { onSuccess },
  });
  const users = data?.users ?? [];

  return { users, data, ...rest };
}
