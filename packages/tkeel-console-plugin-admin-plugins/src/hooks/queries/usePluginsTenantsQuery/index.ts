import { usePluginQuery } from '@tkeel/console-hooks';

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

const url = '/rudder/v1/plugins';
const method = 'GET';

type Props = {
  pluginName: string;
  pageNum: number;
  pageSize: number;
  keyWords: string;
};

type TRequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

export default function usePluginsTenantsQuery({
  pluginName,
  pageNum,
  pageSize,
  keyWords,
}: Props) {
  const { data, ...rest } = usePluginQuery<ApiData, TRequestParams>({
    url: `${url}/${pluginName}/tenants`,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keyWords,
    },
  });
  const tenants = data?.tenants || [];

  return { tenants, data, ...rest };
}
