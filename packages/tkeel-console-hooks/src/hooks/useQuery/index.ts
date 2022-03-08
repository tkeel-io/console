import { merge } from 'lodash';

import { useBaseQuery, UseCustomQueryOptions } from '../react-query';
import useRequestExtras from '../useRequestExtras';

export default function useQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const extras = useRequestExtras();
  const opts = merge({}, { extras }, options);

  return useBaseQuery<TApiData, TRequestParams, TRequestData>(opts);
}
