import { stringify } from 'qs';

import { useDeploymentConfigQuery } from '@tkeel/console-request-hooks';

interface Options {
  data: {
    reset_key: string;
  };
}

export default function useSetPasswordUrl({ data }: Options) {
  const result = useDeploymentConfigQuery();
  const { config } = result;
  const url = `${config.portalTenantURL}/auth/set-password`;
  const query = stringify(data, { addQueryPrefix: true });
  const setPasswordUrl = `${url}${query}`;

  return { ...result, setPasswordUrl };
}
