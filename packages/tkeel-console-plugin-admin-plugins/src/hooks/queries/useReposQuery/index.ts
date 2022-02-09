import useQuery from '@/tkeel-console-plugin-admin-plugins/hooks/useQuery';

export interface Repo {
  name: string;
  url: string;
}

export interface ApiData {
  '@type': string;
  repos: Repo[];
}

const url = '/rudder/v1/repos';
const method = 'GET';

export default function useReposQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const repos = data?.repos || [];

  return { repos, data, ...rest };
}
