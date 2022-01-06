import { useQueries } from 'react-query';

import { UseCustomQueryOptions } from './types';
import { getUseQueryOptions, transformUseQueryResult } from './utils';

export default function useCustomQueries(optionsList: UseCustomQueryOptions[]) {
  const queries = optionsList.map((options) => getUseQueryOptions(options));
  const results = useQueries(queries);
  return results.map((result, index) =>
    transformUseQueryResult({ queryKey: queries[index]?.queryKey, result })
  );
}
