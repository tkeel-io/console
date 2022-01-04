import { useLocation } from 'react-router-dom';
import { useGlobalProps } from '@tkeel/console-business-components';
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
  const { navigate } = useGlobalProps();
  const basePath = process.env.BASE_PATH;
  const handleNoAuth = createHandleNoAuth({ location, navigate, basePath });
  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomQuery<TApiData, TRequestParams, TRequestBody>(opts);
}
