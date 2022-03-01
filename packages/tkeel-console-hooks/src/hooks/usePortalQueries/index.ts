import { merge } from 'lodash';

import { UseCustomQueryOptions, useQueries } from '../react-query';
import usePortalRequestExtras from '../usePortalRequestExtras';

export default function usePortalQueries(optionsList: UseCustomQueryOptions[]) {
  const extras = usePortalRequestExtras();
  const optsList = optionsList.map((option) => {
    return merge({}, { extras }, option);
  });

  return useQueries(optsList);
}
