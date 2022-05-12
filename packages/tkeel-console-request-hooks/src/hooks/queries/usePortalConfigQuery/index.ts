import { APPEARANCE } from '@tkeel/console-constants';
import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface ApiData<DefaultConfig> {
  '@type': string;
  value: DefaultConfig;
}

interface Props<DefaultConfig> {
  key?: string;
  path?: string;
  defaultConfig?: DefaultConfig;
  onSuccess: (
    data: RequestResult<ApiData<DefaultConfig>, undefined, undefined>
  ) => void;
}

const defaultProps = {
  key: 'appearance',
  path: 'config',
  defaultConfig: APPEARANCE,
};

export default function usePortalConfigQuery<DefaultConfig>(
  props?: Props<DefaultConfig>
) {
  const { key, path, defaultConfig, onSuccess } = { ...defaultProps, ...props };
  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  const url = `/rudder/v1/config/platform?key=${key}&path=${path}`;
  const result = useQuery<ApiData<DefaultConfig>>({
    url,
    method: 'GET',
    reactQueryOptions,
    extras: {
      isWithToken: false,
    },
  });
  const { data } = result;

  const config = data?.value || defaultConfig;

  return { ...result, config };
}
