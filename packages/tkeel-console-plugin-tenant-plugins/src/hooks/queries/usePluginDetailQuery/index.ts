import useQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/useQuery';

export interface Plugin {
  id: string;
  register_timestamp: string;
  installer_brief: {
    name: string;
    version: string;
    repo: string;
  };
}

interface ApiData {
  '@type': string;
  plugin: Plugin;
}

const url = '/rudder/v1/plugins';
const method = 'GET';

type Props = {
  pluginName: string;
};

export default function usePluginDetailQuery({ pluginName }: Props) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${pluginName}`,
    method,
  });
  const plugin = data?.plugin || {};

  return { plugin, data, ...rest };
}
