import { useQuery } from '@tkeel/console-hooks';

export interface ProxyListItemData {
  id: string;
  name: string;
  port: string;
  status: string;
  online: string;
  token: string;
  protocol: string;
  remark: string;
  device_name: string;
  device_id: string;
  url: string;
  host: string;
}

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  proxy_list: ProxyListItemData[];
}

const url = '/fluxswitch/v1/proxy';
const method = 'GET';

interface Props {
  pageNum: number;
  pageSize: number;
  query: string;
  id: string;
}

interface TRequestParams {
  page_num: number;
  page_size: number;
  query: string;
  client_id: string;
}

export default function useNetworkListQuery({
  pageNum,
  pageSize,
  query,
  id,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      query,
      client_id: id,
    },
  });
  const proxyList = data?.proxy_list || [];
  return { proxyList, data, ...rest };
}
