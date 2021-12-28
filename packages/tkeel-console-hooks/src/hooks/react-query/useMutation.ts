import { useMutation } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';
import { AxiosRequestConfig } from 'axios';

import { UseCustomMutationOptions } from './types';
import { getUseMutationOptions, transformUseMutationResult } from './utils';

export default function useCustomMutation<T, D = undefined>(
  options: UseCustomMutationOptions<T, D>
) {
  const opts = getUseMutationOptions<T, D>(options);
  const { mutationKey } = opts;
  const result = useMutation<
    RequestResult<T, D>,
    unknown,
    AxiosRequestConfig<D>
  >(opts);
  const r = transformUseMutationResult<T, D>({
    mutationKey,
    result,
  });

  return r;
}
