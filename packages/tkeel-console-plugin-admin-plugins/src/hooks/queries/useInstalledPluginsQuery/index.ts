import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';
import { BriefInstallerInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface Plugin {
  id: string;
  plugin_version: string;
  tkeel_version: string;
  secret: string;
  register_timestamp: string;
  active_tenantes: string[];
  status: string;
  brief_installer_info: BriefInstallerInfo;
}

export interface ApiData {
  '@type': string;
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

  if (process.env.NODE_ENV === 'development') {
    let mockPlugins: Plugin[] = [];

    try {
      mockPlugins = JSON.parse(process.env.MOCK_PLUGINS || '') as Plugin[];
    } catch {
      //
    }

    return {
      plugins: [...plugins, ...mockPlugins],
      data,
      ...rest,
    };
  }

  return { plugins, data, ...rest };
}
