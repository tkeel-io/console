import { ReactNode } from 'react';

import { GlobalPluginProps } from '@tkeel/console-types';

import Context from './context';

type Props = {
  globalProps: GlobalPluginProps;
  children?: ReactNode;
};

export default function PluginProvider({
  globalProps,
  children = null,
}: Props) {
  return <Context.Provider value={globalProps}>{children}</Context.Provider>;
}

export { default as useGlobalProps } from './useGlobalProps';
