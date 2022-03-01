import { usePluginQuery } from '@tkeel/console-hooks';

export interface Repo {
  name: string;
  url: string;
  metadata: object;
  annotations: object;
  installer_num: number;
}

export interface ApiData {
  '@type': string;
  repos: Repo[];
}

const url = '/rudder/v1/repos';
const method = 'GET';

export default function useReposQuery() {
  const { data, ...rest } = usePluginQuery<ApiData>({
    url,
    method,
  });
  const repos = data?.repos || [];

  return { repos, data, ...rest };
}
