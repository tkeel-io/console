import { usePortalQuery } from '@tkeel/console-hooks';
import { RequestExtras } from '@tkeel/console-utils';

type Options = {
  extras?: RequestExtras;
};

export default function useOAuthAuthorizeQuery({ extras }: Options = {}) {
  const url = '/rudder/v1/oauth2/authorize';
  return usePortalQuery({ url, method: 'GET', extras });
}
