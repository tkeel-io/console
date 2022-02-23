import useQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/useQuery';

type Plugin = {
  id: string;
  register_timestamp: string;
  tenant_enable: boolean;
  installer_brief: {
    name: string;
    icon: string;
    version: string;
    repo: string;
    desc: string;
    maintainers: {
      name: string;
      email: string;
      url: string;
    }[];
  };
};

type ApiData = {
  '@type': string;
  plugin: {
    plugin: Plugin;
  };
};

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
  const plugin = data?.plugin?.plugin;

  return { plugin, data, ...rest };
}
