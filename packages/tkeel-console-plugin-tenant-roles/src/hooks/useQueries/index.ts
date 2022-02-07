import { useGlobalProps } from '@tkeel/console-business-components';
import {
  UseCustomQueryOptions,
  useNoAuthRedirectPath,
  useQueries as useCustomQueries,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';
import { merge } from 'lodash';

export default function useQueries(optionsList: UseCustomQueryOptions[]) {
  const { platformName, navigate } = useGlobalProps();
  const basePath = process.env.BASE_PATH;
  const redirectPath = useNoAuthRedirectPath({ platformName, basePath });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });
  const optsList = optionsList.map((option) => {
    return merge({}, { extras: { handleNoAuth } }, option);
  });

  return useCustomQueries(optsList);
}
