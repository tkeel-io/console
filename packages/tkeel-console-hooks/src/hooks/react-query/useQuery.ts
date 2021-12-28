import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformUseQueryResult } from './utils';

export default function useCustomQuery<T, D>(
  options: UseCustomQueryOptions<T, D>
) {
  const opts = getUseQueryOptions<T, D>(options);
  const { queryKey } = opts;
  const result = useQuery<RequestResult<T, D>, unknown, RequestResult<T, D>>(
    opts
  );
  const r = transformUseQueryResult<T, D>({ queryKey, result });

  return r;
}
