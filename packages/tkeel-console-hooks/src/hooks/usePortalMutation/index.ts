import { merge } from 'lodash';

import { UseCustomMutationOptions, useMutation } from '../react-query';
import usePortalHandleNoAuth from '../usePortalHandleNoAuth';

export default function usePortalMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const handleNoAuth = usePortalHandleNoAuth();
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useMutation<TApiData, TRequestParams, TRequestData>(opts);
}
