import { useContext } from 'react';

import Context from '@/tkeel-console-portal-base/contexts/GlobalPropsContext';

export default function useGlobalProps() {
  return useContext(Context);
}
