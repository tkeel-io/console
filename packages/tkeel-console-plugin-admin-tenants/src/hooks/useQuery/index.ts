import { merge } from 'lodash';

import {
  UseCustomQueryOptions,
  usePluginHandleNoAuth,
  useQuery as useCustomQuery,
} from '@tkeel/console-hooks';

export default function useQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const handleNoAuth = usePluginHandleNoAuth();
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomQuery<TApiData, TRequestParams, TRequestData>(opts);
}
