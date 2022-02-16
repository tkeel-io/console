import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

const method = 'POST';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface ApiData {
  '@type': string;
  roles?: string[];
}

export default function useRolesQuery({
  params,
}: { params?: RequestParams } = {}) {
  const url = `/tkeel-device/v1/groups/tree`;
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
  const roles = data?.roles ?? [];

  return { roles, data, ...rest };
}
