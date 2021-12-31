import { useMutation } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';
import { AxiosRequestConfig } from 'axios';

import { UseCustomMutationOptions } from './types';
import { getUseMutationOptions, transformUseMutationResult } from './utils';

export default function useCustomMutation<TApiData, TRequestBody = undefined>(
  options: UseCustomMutationOptions<TApiData, TRequestBody>
) {
  const opts = getUseMutationOptions<TApiData, TRequestBody>(options);
  const { mutationKey } = opts;
  const result = useMutation<
    RequestResult<TApiData, TRequestBody>,
    unknown,
    AxiosRequestConfig<TRequestBody>
  >(opts);
  const r = transformUseMutationResult<TApiData, TRequestBody>({
    mutationKey,
    result,
  });

  return r;
}
