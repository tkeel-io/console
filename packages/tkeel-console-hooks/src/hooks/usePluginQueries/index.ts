import { merge } from 'lodash';

import { UseCustomQueryOptions, useQueries } from '../react-query';
import usePluginHandleNoAuth from '../usePluginHandleNoAuth';

export default function usePluginQueries(optionsList: UseCustomQueryOptions[]) {
  const handleNoAuth = usePluginHandleNoAuth();
  const optsList = optionsList.map((option) => {
    return merge({}, { extras: { handleNoAuth } }, option);
  });

  return useQueries(optsList);
}
