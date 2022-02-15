import useQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/useQuery';

interface Plugin {
  id: string;
  brief_installer_info: {
    name: string;
    version: string;
    repo: string;
  };
}

interface ApiData {
  '@type': string;
  total: number;
  plugin_list: Plugin[];
}

const url = '/rudder/v1/plugins';
const method = 'GET';

export default function usePluginsQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const plugins = data?.plugin_list || [];

  return { plugins, data, ...rest };
}
