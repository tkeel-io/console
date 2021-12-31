import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformUseQueryResult } from './utils';

export default function useCustomQuery<TApiData, TRequestBody = undefined>(
  options: UseCustomQueryOptions<TApiData, TRequestBody>
) {
  const opts = getUseQueryOptions<TApiData, TRequestBody>(options);
  const { queryKey } = opts;
  const result = useQuery<
    RequestResult<TApiData, TRequestBody>,
    unknown,
    RequestResult<TApiData, TRequestBody>
  >(opts);
  const r = transformUseQueryResult<TApiData, TRequestBody>({
    queryKey,
    result,
  });

  return r;
}
