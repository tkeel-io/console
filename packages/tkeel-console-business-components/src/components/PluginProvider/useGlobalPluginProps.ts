import { useContext } from 'react';

import Context from './context';

export default function useGlobalProps() {
  return useContext(Context);
}
