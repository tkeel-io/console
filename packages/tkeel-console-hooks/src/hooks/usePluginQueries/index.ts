import { merge } from 'lodash';

import { UseCustomQueryOptions, useQueries } from '../react-query';
import usePluginRequestExtras from '../usePluginRequestExtras';

export default function usePluginQueries(optionsList: UseCustomQueryOptions[]) {
  const extras = usePluginRequestExtras();
  const optsList = optionsList.map((option) => {
    return merge({}, { extras }, option);
  });

  return useQueries(optsList);
}
