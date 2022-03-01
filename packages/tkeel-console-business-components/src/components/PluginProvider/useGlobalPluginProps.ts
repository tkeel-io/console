import { useContext } from 'react';

import Context from './context';

export default function useGlobalPluginProps() {
  return useContext(Context);
}
