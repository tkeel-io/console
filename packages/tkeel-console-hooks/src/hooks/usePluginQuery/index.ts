import { merge } from 'lodash';

import { UseCustomQueryOptions, useQuery } from '../react-query';
import usePluginHandleNoAuth from '../usePluginHandleNoAuth';

export default function usePluginQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const handleNoAuth = usePluginHandleNoAuth();
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useQuery<TApiData, TRequestParams, TRequestData>(opts);
}
