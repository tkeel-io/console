import { merge } from 'lodash';

import { UseCustomQueryOptions, useQuery } from '../react-query';
import usePortalHandleNoAuth from '../usePortalHandleNoAuth';

export default function usePortalQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const handleNoAuth = usePortalHandleNoAuth();
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useQuery<TApiData, TRequestParams, TRequestData>(opts);
}
