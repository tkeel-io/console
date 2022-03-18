import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

import { PluginState } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface Installer {
  name: string;
  version: string;
  repo: string;
  metadata: {
    Chart: string;
    configuration: string;
    readme: string;
  };
  annotations: {
    'tkeel.io/deployment-name': string;
    'tkeel.io/enable': string;
    'tkeel.io/plugin-port': string;
    'tkeel.io/tag': string;
    'tkeel.io/version': string;
  };
  maintainers: {
    name: string;
    email: string;
    url: string;
  }[];
  state: PluginState;
  desc: string;
  timestamp: string;
  icon: string;
}

export interface PluginDetail {
  '@type': string;
  installer: Installer;
}

type Props = {
  repoName: string;
  installerName: string;
  installerVersion: string;
  enabled?: boolean;
  onSuccess?: (data: RequestResult<PluginDetail, undefined, undefined>) => void;
};

const url = '/rudder/v1/repos';
const method = 'GET';

export default function usePluginDetailQuery({
  repoName,
  installerName,
  installerVersion,
  enabled = true,
  onSuccess,
}: Props) {
  const { data, ...rest } = useQuery<PluginDetail>({
    url: `${url}/${repoName}/installers/${installerName}/${installerVersion}`,
    method,
    reactQueryOptions: {
      enabled,
      onSuccess,
    },
  });
  const pluginDetail = data?.installer;

  return { pluginDetail, data, ...rest };
}
