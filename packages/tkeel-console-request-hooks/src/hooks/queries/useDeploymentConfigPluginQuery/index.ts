import { usePluginQuery } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
}

export default function useDeploymentConfigPluginQuery() {
  const { data, ...rest } = usePluginQuery<ApiData>({
    url: '/rudder/v1/config/deployment',
    method: 'GET',
  });

  return { config: data, data, ...rest };
}
