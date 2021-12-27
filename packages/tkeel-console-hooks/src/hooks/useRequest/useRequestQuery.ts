import { useQuery } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseQueryOptions } from './types';
import { getUseQueryOptions, transformResult } from './utils';

export default function useRequestQuery<T>(options: UseQueryOptions<T>) {
  const opts = getUseQueryOptions(options);
  const { queryKey } = opts;
  const result = useQuery<RequestResult<T>, Error, RequestResult<T>>(opts);
  return transformResult<T>({ queryKey, result });
}
