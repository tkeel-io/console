import { Menu } from '@tkeel/console-types';

import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';
import { BriefInstallerInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface PluginDetail {
  id: string;
  tkeel_version: string;
  secret: string;
  register_timestamp: string;
  active_tenantes: string[];
  status: string;
  brief_installer_info: BriefInstallerInfo;
  console_entries: Menu[];
}

export interface ApiData {
  '@type': string;
  plugin: PluginDetail;
}

const url = '/rudder/v1/plugins';
const method = 'GET';

export default function usePluginDetailQuery(id: string) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${id}`,
    method,
  });
  const pluginDetail = data?.plugin;

  return { pluginDetail, data, ...rest };
}
