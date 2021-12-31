import { useMutation } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';
import { AxiosRequestConfig } from 'axios';

import { UseCustomMutationOptions } from './types';
import { getUseMutationOptions, transformUseMutationResult } from './utils';

export default function useCustomMutation<TApiData, D = undefined>(
  options: UseCustomMutationOptions<TApiData, D>
) {
  const opts = getUseMutationOptions<TApiData, D>(options);
  const { mutationKey } = opts;
  const result = useMutation<
    RequestResult<TApiData, D>,
    unknown,
    AxiosRequestConfig<D>
  >(opts);
  const r = transformUseMutationResult<TApiData, D>({
    mutationKey,
    result,
  });

  return r;
}
