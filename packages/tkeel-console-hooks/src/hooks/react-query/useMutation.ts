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
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const opts = getUseMutationOptions<TApiData, TRequestParams, TRequestData>(
    options
  );
  const { mutationKey } = opts;
  const result = useMutation<
    RequestResult<TApiData, TRequestParams, TRequestData>,
    unknown,
    AxiosRequestConfigExtended<TRequestParams, TRequestData>
  >(opts);
  return transformUseMutationResult<TApiData, TRequestParams, TRequestData>({
    mutationKey,
    result,
  });
}
