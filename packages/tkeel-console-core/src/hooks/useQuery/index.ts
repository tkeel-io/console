import { useLocation, useNavigate } from 'react-router-dom';
import {
  UseCustomQueryOptions,
  useQuery as useCustomQuery,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';
import { merge } from 'lodash';

export default function useQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestBody = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestBody>) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNoAuth = createHandleNoAuth({ location, navigate });
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomQuery<TApiData, TRequestParams, TRequestBody>(opts);
}
