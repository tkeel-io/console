import { useQuery } from 'react-query';

import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformUseQueryResult } from './utils';

export default function useCustomQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const opts = getUseQueryOptions<TApiData, TRequestParams, TRequestData>(
    options
  );
  const { queryKey } = opts;
  const result = useQuery<
    RequestResult<TApiData, TRequestParams, TRequestData>,
    unknown,
    RequestResult<TApiData, TRequestParams, TRequestData>
  >(opts);
  return transformUseQueryResult<TApiData, TRequestParams, TRequestData>({
    queryKey,
    result,
  });
}
