import { RequestExtras } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-portal-admin/hooks/useQuery';

type Options = {
  extras?: RequestExtras;
};

export default function useOAuthAuthorizeQuery({ extras }: Options = {}) {
  const url = '/rudder/v1/oauth2/authorize';
  return useQuery({ url, method: 'GET', extras });
}
