import { merge } from 'lodash';

import { useBaseQueries, UseCustomQueryOptions } from '../react-query';
import useRequestDefaultOptions from '../useRequestDefaultOptions';

export default function useQueries(optionsList: UseCustomQueryOptions[]) {
  const defaultOptions = useRequestDefaultOptions();
  const optsList = optionsList.map((option) => {
    return merge({}, defaultOptions, option);
  });

  return useBaseQueries(optsList);
}
