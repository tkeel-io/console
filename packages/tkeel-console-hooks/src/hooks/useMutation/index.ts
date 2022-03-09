import { merge } from 'lodash';

import { useBaseMutation, UseCustomMutationOptions } from '../react-query';
import useRequestDefaultOptions from '../useRequestDefaultOptions';

export default function useMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const defaultOptions = useRequestDefaultOptions();
  const opts = merge({}, defaultOptions, options);

  return useBaseMutation<TApiData, TRequestParams, TRequestData>(opts);
}
