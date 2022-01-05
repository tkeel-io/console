import { RequestExtras } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-core/hooks/useQuery';

const url = '/security/v1/oauth/authenticate';
const method = 'GET';

type Options = {
  extras?: RequestExtras;
};

export default function useOAuthAuthenticate(options?: Options) {
  const extras = options?.extras;
  return useQuery({ url, method, extras });
}
