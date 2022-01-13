import { RequestExtras } from '@tkeel/console-utils';

import useOAuthAuthenticateQuery from '@/tkeel-console-portal-base/hooks/queries/useOAuthAuthenticateQuery';

type Options = {
  extras?: RequestExtras;
};

export default function useAuth(options?: Options) {
  return useOAuthAuthenticateQuery(options);
}
