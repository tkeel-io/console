import { useMutation } from '@tkeel/console-hooks';

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

type Props = {
  name: string;
  method: 'POST' | 'PUT';
  onSuccess: () => void;
};

export default function useInstallPluginMutation({
  name,
  method,
  onSuccess,
}: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${name}`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
