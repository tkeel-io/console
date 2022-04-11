import { useContext } from 'react';

import Context from './context';

export default function useGlobalPortalValue() {
  return useContext(Context);
}
