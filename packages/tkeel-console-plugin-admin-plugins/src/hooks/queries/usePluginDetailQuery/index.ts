import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';

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
  maintainers: [
    {
      name: string;
      email: string;
      url: string;
    }
  ];
  installed: boolean;
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
};

const url = '/rudder/v1/repos';
const method = 'GET';

export default function usePluginDetailQuery({
  repoName,
  installerName,
  installerVersion,
  enabled = true,
}: Props) {
  const { data, ...rest } = useQuery<PluginDetail>({
    url: `${url}/${repoName}/installers/${installerName}/${installerVersion}`,
    method,
    reactQueryOptions: {
      enabled,
    },
  });
  const pluginDetail = data?.installer;

  return { pluginDetail, data, ...rest };
}
