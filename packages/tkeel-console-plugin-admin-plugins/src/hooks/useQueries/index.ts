import { merge } from 'lodash';

import { useGlobalPluginProps } from '@tkeel/console-business-components';
import {
  UseCustomQueryOptions,
  useNoAuthRedirectPath,
  useQueries as useCustomQueries,
} from '@tkeel/console-hooks';
import { createHandleNoAuth } from '@tkeel/console-utils';

export default function useQueries(optionsList: UseCustomQueryOptions[]) {
  const { portalName, navigate } = useGlobalPluginProps();
  const basePath = process.env.BASE_PATH;
  const redirectPath = useNoAuthRedirectPath({ portalName, basePath });
  const handleNoAuth = createHandleNoAuth({ navigate, redirectPath });
  const optsList = optionsList.map((option) => {
    return merge({}, { extras: { handleNoAuth } }, option);
  });

  return useCustomQueries(optsList);
}
