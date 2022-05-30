import { useQuery } from '@tkeel/console-hooks';

import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  brief_installers: PluginInfo[];
  installed_num: number;
}

type TRequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
  installed: boolean;
};

const url = '/rudder/v1/repos/installers';
const method = 'GET';

type Props = {
  pageNum: number;
  pageSize: number;
  keyWords?: string;
  enabled?: boolean;
};

const defaultProps = {
  pageNum: 1,
  pageSize: 20,
  keyWords: '',
  enabled: true,
};

export default function useInstalledPluginsQuery(props?: Props) {
  const { pageNum, pageSize, keyWords, enabled } = {
    ...defaultProps,
    ...props,
  };
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keyWords,
      installed: true,
    },
    reactQueryOptions: {
      enabled,
    },
  });
  const plugins = data?.brief_installers || [];
  const total = data?.total || 0;

  return { plugins, total, data, ...rest };
}
