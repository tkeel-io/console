import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformResult } from './utils';

export default function useCustomQuery<T>(options: UseCustomQueryOptions<T>) {
  const opts = getUseQueryOptions(options);
  const { queryKey } = opts;
  const result = useQuery<RequestResult<T>, Error, RequestResult<T>>(opts);
  return transformResult<T>({ queryKey, result });
}
