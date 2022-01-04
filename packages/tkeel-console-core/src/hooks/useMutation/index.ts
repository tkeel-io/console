import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const handleNoAuth = createHandleNoAuth({ location, navigate });
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomMutation<TApiData, TRequestParams, TRequestBody>(opts);
}
