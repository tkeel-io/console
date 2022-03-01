import { merge } from 'lodash';

import { UseCustomMutationOptions, useMutation } from '../react-query';
import usePortalRequestExtras from '../usePortalRequestExtras';

export default function usePortalMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const extras = usePortalRequestExtras();
  const opts = merge({}, { extras }, options);

  return useMutation<TApiData, TRequestParams, TRequestData>(opts);
}
