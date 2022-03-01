import { ReactNode } from 'react';

import Context from './context';
import { GlobalPortalProps } from './types';

type Props = {
  globalProps: GlobalPortalProps;
  children?: ReactNode;
};

export default function PortalProvider({
  globalProps,
  children = null,
}: Props) {
  return <Context.Provider value={globalProps}>{children}</Context.Provider>;
}
