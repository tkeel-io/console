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

type TRequestParams = {
  page_num: number;
  page_size: number;
  installed: boolean;
};

const url = '/rudder/v1/repos/installers';
const method = 'GET';

type Props = {
  enabled?: boolean;
};

export default function useInstalledPluginsQuery({ enabled = true }: Props) {
  const { data, ...rest } = useQuery<ApiData, TRequestParams>({
    url,
    method,
    params: {
      page_num: 1,
      page_size: 10,
      installed: true,
    },
    reactQueryOptions: {
      enabled,
    },
  });
  const plugins = data?.brief_installers || [];

  return { plugins, data, ...rest };
}
