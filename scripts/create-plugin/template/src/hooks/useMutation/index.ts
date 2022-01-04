import { useLocation } from 'react-router-dom';
import { useGlobalProps } from '@tkeel/console-business-components';
import {
  UseCustomMutationOptions,
  useMutation as useCustomMutation,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';
import { merge } from 'lodash';

export default function useMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestBody = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestBody>) {
  const location = useLocation();
  const { navigate } = useGlobalProps();
  const basePath = process.env.BASE_PATH;
  const handleNoAuth = createHandleNoAuth({ location, navigate, basePath });
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomMutation<TApiData, TRequestParams, TRequestBody>(opts);
}
