import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';
import { BriefInstallerInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface ApiData {
  '@type': string;
  brief_installers: BriefInstallerInfo[];
}

const url = '/rudder/v1/repos';
const method = 'GET';

type Props = {
  repo: string;
  enabled: boolean;
};

export default function useRepoInstallersQuery({ repo, enabled }: Props) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${repo}/installers`,
    method,
    reactQueryOptions: {
      enabled,
    },
  });
  const plugins = data?.brief_installers || [];

  return { plugins, data, ...rest };
}
