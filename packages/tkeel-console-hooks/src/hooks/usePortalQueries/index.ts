import { merge } from 'lodash';

import { UseCustomQueryOptions, useQueries } from '../react-query';
import usePortalHandleNoAuth from '../usePortalHandleNoAuth';

export default function usePortalQueries(optionsList: UseCustomQueryOptions[]) {
  const handleNoAuth = usePortalHandleNoAuth();
  const optsList = optionsList.map((option) => {
    return merge({}, { extras: { handleNoAuth } }, option);
  });

  return useQueries(optsList);
}
