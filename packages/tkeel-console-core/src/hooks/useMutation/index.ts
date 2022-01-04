import { useLocation, useNavigate } from 'react-router-dom';
import {
  UseCustomMutationOptions,
  useMutation as useCustomMutation,
} from '@tkeel/console-hooks';
import { merge } from 'lodash';

export default function useMutation<
  TApiData,
  TRequestParams = undefined,
  TRequestBody = undefined
>(options: UseCustomMutationOptions<TApiData, TRequestParams, TRequestBody>) {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const extras = {
    handleNoAuth() {
      const redirect = encodeURIComponent(`${pathname}${search}${hash}`);
      navigate(`/auth/login?redirect=${redirect}`, { replace: true });
    },
  };
  const opts = merge({}, { extras }, options);

  return useCustomMutation<TApiData, TRequestParams, TRequestBody>(opts);
}
