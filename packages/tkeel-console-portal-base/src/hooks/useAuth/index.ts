import { PLATFORM_INFOS, PlatformNames } from '@tkeel/console-constants';
import { RequestExtras } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-portal-base/hooks/useQuery';

type Options = {
  platformName: PlatformNames;
  extras?: RequestExtras;
};

export default function useAuth({ platformName, extras }: Options) {
  const url = PLATFORM_INFOS[platformName].validateAuthApi;
  return useQuery({ url, method: 'GET', extras });
}
