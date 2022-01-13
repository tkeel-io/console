import { RequestExtras } from '@tkeel/console-utils';

import {
  PlatformNames,
  PLATFORMS,
} from '@/tkeel-console-portal-base/constants';
import useQuery from '@/tkeel-console-portal-base/hooks/useQuery';

type Options = {
  platformName: PlatformNames;
  extras?: RequestExtras;
};

export default function useAuth({ platformName, extras }: Options) {
  const url = PLATFORMS[platformName].validateAuthApi;
  return useQuery({ url, method: 'GET', extras });
}
