import { merge } from 'lodash';

import { UseCustomQueryOptions, useQuery } from '../react-query';
import usePluginRequestExtras from '../usePluginRequestExtras';

export default function usePortalQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const extras = usePluginRequestExtras();
  const opts = merge({}, { extras }, options);

  return useQuery<TApiData, TRequestParams, TRequestData>(opts);
}
