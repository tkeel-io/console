import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';

export interface Installer {
  name: string;
  version: string;
  repo: string;
  configuration: string;
}

export interface ApiData {
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
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${repoName}/installers/${installerName}/${installerVersion}`,
    method,
    reactQueryOptions: {
      enabled,
    },
  });
  const pluginDetail = data?.installer;

  return { pluginDetail, data, ...rest };
}
