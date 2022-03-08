import { merge } from 'lodash';

import { useBaseMutation, UseCustomMutationOptions } from '../react-query';
import useRequestExtras from '../useRequestExtras';

export default function useMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const extras = useRequestExtras();
  const opts = merge({}, { extras }, options);

  return useBaseMutation<TApiData, TRequestParams, TRequestData>(opts);
}
