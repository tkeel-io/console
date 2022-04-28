import { QueryKey } from 'react-query';

import { useQuery } from '@tkeel/console-hooks';

export interface RouteItemData {
  created_at: string;
  desc: string;
  id: string;
  name: string;
  status: number;
  type: number;
  updated_at: string;
  devices_status: number;
  targets_status: number;
  sub_id: number | unknown;
  model_id: string;
  model_name: string;
}

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  data: RouteItemData[];
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

type Props = {
  pageNum: number;
  pageSize: number;
  queryKey?: QueryKey;
  type?: number;
};

type TRequestParams = {
  page_num: number;
  page_size: number;
  type: number;
};

export default function useRouteRulesQuery({
  pageNum,
  pageSize,
  type,
  queryKey,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      type: type ?? 0,
    },
    reactQueryOptions: {
      queryKey,
    },
  });
  const routeRulesData = data?.data || [];

  return { routeRulesData, data, ...rest };
}
