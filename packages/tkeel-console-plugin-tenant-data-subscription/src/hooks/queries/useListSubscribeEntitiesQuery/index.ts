import { RequestResult } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'POST';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
  id?: string;
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
  roles: string[];
}

export interface ApiData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  users: User[];
  data: [
    {
      ID: string;
      group: string;
      name: string;
      status: string;
      template: string;
      updated_at: string;
    }
  ];
}

export default function useListSubscribeEntitiesQuery({
  params,
}: // onSuccess,
{
  params?: RequestParams;
  onSuccess?: (
    data: RequestResult<ApiData, RequestParams, undefined>
  ) => unknown;
} = {}) {
  // const url = `/security/v1/tenants/${tenantId}/users`;
  // console.log('params', params);
  const url = `/core-broker/v1/subscribe/${params?.id || 0}/entities/list`;

  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: {
      key_words: params?.key_words,
      page_num: params?.page_num,
      page_size: params?.page_size,
    },
    // reactQueryOptions: { onSuccess },
  });
  const users = data?.users ?? [];

  return { users, data, ...rest };
}
