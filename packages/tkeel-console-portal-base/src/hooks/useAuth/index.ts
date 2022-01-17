import { PLATFORM_INFOS } from '@tkeel/console-constants';
import { RequestExtras } from '@tkeel/console-utils';

import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';
import useQuery from '@/tkeel-console-portal-base/hooks/useQuery';

type Options = {
  extras?: RequestExtras;
};

export default function useAuth({ extras }: Options) {
  const { platformName } = useGlobalProps();
  const url = PLATFORM_INFOS[platformName].validateAuthApi;
  return useQuery({ url, method: 'GET', extras });
}
