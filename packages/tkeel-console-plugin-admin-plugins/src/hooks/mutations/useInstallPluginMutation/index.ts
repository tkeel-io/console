import { usePluginMutation } from '@tkeel/console-hooks';

import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

interface RequestData {
  name: string;
  version: string;
  repo: string;
  configuration: string;
  type: 1;
}

export interface ApiData {
  '@types': string;
  plugin: {
    id: string;
    status: string;
    installer_brief: PluginInfo;
  };
}

const url = '/rudder/v1/plugins';
const method = 'POST';

type Props = {
  name: string;
  onSuccess: () => void;
};

export default function useInstallPluginMutation({ name, onSuccess }: Props) {
  return usePluginMutation<ApiData, undefined, RequestData>({
    url: `${url}/${name}`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
