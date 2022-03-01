import { merge } from 'lodash';

import {
  UseCustomMutationOptions,
  useMutation as useCustomMutation,
  usePluginHandleNoAuth,
} from '@tkeel/console-hooks';

export default function useMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const handleNoAuth = usePluginHandleNoAuth();
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomMutation<TApiData, TRequestParams, TRequestData>(opts);
}
