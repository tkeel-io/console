import useQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/useQuery';

interface Plugin {
  id: string;
  installer_brief: {
    name: string;
    version: string;
    icon: string;
    desc: string;
    repo: string;
  };
  tenant_enable: boolean;
}

interface ApiData {
  '@type': string;
  total: number;
  plugin_list: Plugin[];
}

type RequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

type Props = {
  pageNum: number;
  pageSize: number;
  keyWords: string;
};

const url = '/rudder/v1/plugins';
const method = 'GET';

export default function usePluginsQuery({
  pageNum,
  pageSize,
  keyWords,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keyWords,
    },
    method,
  });
  const plugins = data?.plugin_list || [];

  return { plugins, data, ...rest };
}
