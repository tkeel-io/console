import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformUseQueryResult } from './utils';

export default function useCustomQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestBody = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestBody>) {
  const opts = getUseQueryOptions<TApiData, TRequestParams, TRequestBody>(
    options
  );
  const { queryKey } = opts;
  const result = useQuery<
    RequestResult<TApiData, TRequestParams, TRequestBody>,
    unknown,
    RequestResult<TApiData, TRequestParams, TRequestBody>
  >(opts);
  const r = transformUseQueryResult<TApiData, TRequestParams, TRequestBody>({
    queryKey,
    result,
  });

  return r;
}
