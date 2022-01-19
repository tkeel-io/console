import { ReactNode } from 'react';

import Context from '@/tkeel-console-portal-base/contexts/GlobalPropsContext';
import { GlobalProps } from '@/tkeel-console-portal-base/contexts/GlobalPropsContext/types';

type Props = {
  globalProps: GlobalProps;
  children?: ReactNode;
};

export default function Provider({ globalProps, children = null }: Props) {
  return <Context.Provider value={globalProps}>{children}</Context.Provider>;
}
