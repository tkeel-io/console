import { merge } from 'lodash';

import { UseCustomMutationOptions, useMutation } from '../react-query';
import usePluginRequestExtras from '../usePluginRequestExtras';

export default function usePluginMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestData>) {
  const extras = usePluginRequestExtras();
  const opts = merge({}, { extras }, options);

  return useMutation<TApiData, TRequestParams, TRequestData>(opts);
}
