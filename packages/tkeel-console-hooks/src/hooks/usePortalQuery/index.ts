import { merge } from 'lodash';

import { UseCustomQueryOptions, useQuery } from '../react-query';
import usePortalRequestExtras from '../usePortalRequestExtras';

export default function usePortalQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const extras = usePortalRequestExtras();
  const opts = merge({}, { extras }, options);

  return useQuery<TApiData, TRequestParams, TRequestData>(opts);
}
