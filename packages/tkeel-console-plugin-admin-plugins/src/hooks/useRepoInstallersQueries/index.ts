import { Method } from 'axios';

import useQueries from '@/tkeel-console-plugin-admin-plugins/hooks/useQueries';
import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface ApiData {
  '@type': string;
  brief_installers: PluginInfo[];
}

const url = '/rudder/v1/repos';
const method = 'GET';

type Props = {
  repos: string[];
  enabled: boolean;
};

export default function useRepoInstallersQueries({ repos, enabled }: Props) {
  const optionsList = repos.map((repo) => ({
    url: `${url}/${repo}/installers`,
    method: method as Method,
    reactQueryOptions: {
      enabled,
    },
  }));
  const results = useQueries(optionsList);

  const pluginsList = results.map((result) => {
    if (result.data) {
      return (result.data as ApiData)?.brief_installers || [];
    }
    return [
      {
        name: 'plugins',
        version: '0.1.0',
        repo: 'tkeel-default',
      },
    ];
  });

  return { pluginsList };
}
