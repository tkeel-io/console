import { merge } from 'lodash';

import { useBaseQuery, UseCustomQueryOptions } from '../react-query';
import useRequestDefaultOptions from '../useRequestDefaultOptions';

export default function useQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const defaultOptions = useRequestDefaultOptions();
  const opts = merge({}, defaultOptions, options);

  return useBaseQuery<TApiData, TRequestParams, TRequestData>(opts);
}
