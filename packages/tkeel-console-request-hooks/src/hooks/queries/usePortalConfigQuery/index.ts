import { isEmpty } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface ApiData<Config> {
  '@type': string;
  value: Config;
}

interface Props<Config> {
  key: string;
  path: string;
  defaultConfig?: Config;
  onSuccess?: (
    data: RequestResult<ApiData<Config>, undefined, undefined>
  ) => void;
}

export default function usePortalConfigQuery<Config>({
  key,
  path,
  defaultConfig,
  onSuccess,
}: Props<Config>) {
  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  const url = `/rudder/v1/config/platform?key=${key}&path=${path}`;
  const result = useQuery<ApiData<Config>>({
    url,
    method: 'GET',
    reactQueryOptions,
    extras: {
      isWithToken: false,
    },
  });
  const { data, isSuccess } = result;

  let config;
  if (isSuccess) {
    config = isEmpty(data?.value) ? defaultConfig : data?.value;
  }

  return { ...result, config };
}
