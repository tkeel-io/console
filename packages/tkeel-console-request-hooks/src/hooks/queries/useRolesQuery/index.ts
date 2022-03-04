import { usePluginQuery } from '@tkeel/console-hooks';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface Role {
  id: string;
  name: string;
  desc?: string;
  bind_num: number;
  upsert_timestamp: string;
  uneditable: boolean;
  permission_list: {
    path: string;
    permission: {
      id: string;
      name: string;
      desc?: string;
      dependences: { path: string; desc: string }[];
    };
  }[];
}

interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;

  tenant_id: string;
  roles: Role[];
}

type Options = { params?: RequestParams };

export default function useRolesQuery({ params }: Options = {}) {
  const { data, ...rest } = usePluginQuery<ApiData, RequestParams>({
    url: '/security/v1/rbac/roles',
    method: 'GET',
    params,
  });
  const total = data?.total ?? 0;
  const roles = data?.roles ?? [];

  return { total, roles, data, ...rest };
}
