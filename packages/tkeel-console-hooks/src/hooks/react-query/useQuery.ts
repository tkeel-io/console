import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformUseQueryResult } from './utils';

export default function useCustomQuery<TApiData, D = undefined>(
  options: UseCustomQueryOptions<TApiData, D>
) {
  const opts = getUseQueryOptions<TApiData, D>(options);
  const { queryKey } = opts;
  const result = useQuery<
    RequestResult<TApiData, D>,
    unknown,
    RequestResult<TApiData, D>
  >(opts);
  const r = transformUseQueryResult<TApiData, D>({ queryKey, result });

  return r;
}
