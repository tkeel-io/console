import { RequestExtras } from '@tkeel/console-utils';

import useOAuthAuthenticate from '@/tkeel-console-core/hooks/queries/useOAuthAuthenticate';

type Options = {
  extras?: RequestExtras;
};

export default function useAuth(options?: Options) {
  return useOAuthAuthenticate(options);
}
