import { merge } from 'lodash';

import { UseCustomMutationOptions, useMutation } from '../react-query';
import usePluginHandleNoAuth from '../usePluginHandleNoAuth';

export default function usePluginMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const handleNoAuth = usePluginHandleNoAuth();
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useMutation<TApiData, TRequestParams, TRequestData>(opts);
}
