import { usePluginQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

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

interface ApiData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  users: User[];
}

type Options = {
  tenantId: string;
  params?: RequestParams;
  onSuccess?: (data: RequestResult<ApiData, RequestParams, undefined>) => void;
};

export default function useUsersPluginQuery({
  tenantId,
  params,
  onSuccess,
}: Options) {
  const url = `/security/v1/tenants/${tenantId}/users`;

  const { data, ...rest } = usePluginQuery<ApiData, RequestParams>({
    url,
    method,
    params,
    reactQueryOptions: { onSuccess },
  });
  const users = data?.users ?? [];

  return { users, data, ...rest };
}
