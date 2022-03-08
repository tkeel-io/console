import { merge } from 'lodash';

import { useBaseQueries, UseCustomQueryOptions } from '../react-query';
import useRequestExtras from '../useRequestExtras';

export default function useQueries(optionsList: UseCustomQueryOptions[]) {
  const extras = useRequestExtras();
  const optsList = optionsList.map((option) => {
    return merge({}, { extras }, option);
  });

  return useBaseQueries(optsList);
}
