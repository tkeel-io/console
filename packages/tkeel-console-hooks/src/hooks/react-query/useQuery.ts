import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformResult } from './utils';

export default function useCustomQuery<T, D>(
  options: UseCustomQueryOptions<T, D>
) {
  const opts = getUseQueryOptions<T, D>(options);
  const { queryKey } = opts;
  const result = useQuery<RequestResult<T>, unknown, RequestResult<T>>(opts);
  return transformResult<T>({ queryKey, result });
}
