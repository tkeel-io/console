import { useNavigate } from 'react-router-dom';
import {
  UseCustomQueryOptions,
  useNoAuthRedirectPath,
  useQuery as useCustomQuery,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';
import { merge } from 'lodash';

import useGlobalProps from '@/tkeel-console-portal-base/hooks/useGlobalProps';

export default function useQuery<
  TApiData,
  TRequestParams = undefined,
  TRequestData = undefined
>(options: UseCustomQueryOptions<TApiData, TRequestParams, TRequestData>) {
  const { platformName } = useGlobalProps();
  const navigate = useNavigate();
  const redirectPath = useNoAuthRedirectPath({ platformName });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });

  const opts = merge({}, { extras: { handleNoAuth } }, options);

  return useCustomQuery<TApiData, TRequestParams, TRequestData>(opts);
}
