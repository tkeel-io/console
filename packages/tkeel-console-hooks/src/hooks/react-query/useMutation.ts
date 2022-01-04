import { useMutation } from 'react-query';
import {
  AxiosRequestConfigExtended,
  RequestResult,
} from '@tkeel/console-utils';

import { UseCustomMutationOptions } from './types';
import { getUseMutationOptions, transformUseMutationResult } from './utils';

export default function useCustomMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestBody = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestBody>) {
  const opts = getUseMutationOptions<TApiData, TRequestParams, TRequestBody>(
    options
  );
  const { mutationKey } = opts;
  const result = useMutation<
    RequestResult<TApiData, TRequestParams, TRequestBody>,
    unknown,
    AxiosRequestConfigExtended<TRequestParams, TRequestBody>
  >(opts);
  return transformUseMutationResult<TApiData, TRequestParams, TRequestBody>({
    mutationKey,
    result,
  });
}
