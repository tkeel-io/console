import { merge } from 'lodash';

import { useGlobalPluginProps } from '@tkeel/console-business-components';
import {
  UseCustomQueryOptions,
  useNoAuthRedirectPath,
  useQuery as useCustomQuery,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';

export default function useQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const { portalName, navigate } = useGlobalPluginProps();
  const { basePath } = GLOBAL_PLUGIN_CONFIG;
  const redirectPath = useNoAuthRedirectPath({ portalName, basePath });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomQuery<TApiData, TRequestParams, TRequestData>(opts);
}
