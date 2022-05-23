import { useQuery } from '@tkeel/console-hooks';

export interface NetworkItemData {
  id: string;
  name: string;
  client_address: string;
  status: string;
  create_at: string;
  online: string;
  token: string;
}

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  client_list: NetworkItemData[];
}

const url = '/fluxswitch/v1/client';
const method = 'GET';

interface Props {
  pageNum: number;
  pageSize: number;
  query: string;
}

interface TRequestParams {
  page_num: number;
  page_size: number;
  query: string;
}

export default function useNetworksQuery({ pageNum, pageSize, query }: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      query,
    },
  });
  const netWorkData = data?.client_list || [];
  return { netWorkData, data, ...rest };
}
