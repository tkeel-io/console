import { useQuery } from '@tkeel/console-hooks';

export interface Tenant {
  title: string;
  remark: string;
  tenant_id: string;
  operator_id: string;
  enable_timestamp: string;
  user_num: number;
}

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  tenants: Tenant[];
}

const url = '/rule-manager/v1/rules';
const method = 'GET';

type Props = {
  pageNum: number;
  pageSize: number;
};

type TRequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

export default function useRouteRulesQuery({ pageNum, pageSize }: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: '',
    },
  });
  const tenants = data?.tenants || [];

  return { tenants, data, ...rest };
}
