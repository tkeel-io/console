import { isEmpty } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export type UseConfigQueryOnSuccess<Config> = (
  data: RequestResult<ApiData<Config>, undefined, undefined>
) => void;

interface ApiData<Config> {
  '@type': string;
  value: Config;
}

interface Props<Config> {
  key: string;
  path?: string;
  defaultConfig?: Config;
  onSuccess?: UseConfigQueryOnSuccess<Config>;
}

export default function useConfigQuery<Config>({
  key,
  path,
  defaultConfig,
  onSuccess,
}: Props<Config>) {
  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  let url = `/rudder/v1/config/platform?key=${key}`;
  if (path) {
    url += `&path=${path}`;
  }
  const result = useQuery<ApiData<Config>>({
    url,
    method: 'GET',
    reactQueryOptions,
    extras: {
      isWithToken: false,
      handleNoAuth: false,
    },
  });
  const { data, isSuccess } = result;

  let config;
  if (isSuccess) {
    config = isEmpty(data?.value) ? defaultConfig : data?.value;
  }

  return { ...result, config };
}
