import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';
import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface ApiData {
  '@type': string;
  total: number;
  page_num: number;
  page_size: number;
  brief_installers: PluginInfo[];
  installed_num: number;
}

const url = '/rudder/v1/repos';
const method = 'GET';

type Props = {
  repo: string;
  keyWords: string;
  pageNum: number;
  pageSize: number;
  enabled: boolean;
};

type TRequestParams = {
  page_num: number;
  page_size: number;
  key_words: string;
};

export default function useRepoInstallersQuery({
  repo,
  keyWords,
  pageNum,
  pageSize,
  enabled,
}: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url: `${url}/${repo}/installers`,
    method,
    params: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keyWords,
    },
    reactQueryOptions: {
      enabled,
    },
  });
  const plugins =
    data?.brief_installers.map((item) => ({ ...item, icon: '' })) || [];

  return { plugins, data, ...rest };
}
