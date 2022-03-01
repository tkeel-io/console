import { useContext } from 'react';

import Context from './context';

export default function useGlobalPortalProps() {
  return useContext(Context);
}
