import { merge } from 'lodash';

import {
  UseCustomQueryOptions,
  usePluginHandleNoAuth,
  useQueries as useCustomQueries,
} from '@tkeel/console-hooks';

export default function useQueries(optionsList: UseCustomQueryOptions[]) {
  const handleNoAuth = usePluginHandleNoAuth();
  const optsList = optionsList.map((option) => {
    return merge({}, { extras: { handleNoAuth } }, option);
  });

  return useCustomQueries(optsList);
}
