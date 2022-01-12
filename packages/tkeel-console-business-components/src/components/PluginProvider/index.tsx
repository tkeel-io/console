import { ReactNode } from 'react';
import { PluginGlobalProps } from '@tkeel/console-types';

import Context from './context';

type Props = {
  globalProps: PluginGlobalProps;
  children?: ReactNode;
};

export default function PluginProvider({ globalProps, children }: Props) {
  return <Context.Provider value={globalProps}>{children}</Context.Provider>;
}

PluginProvider.defaultProps = {
  children: null,
};

export { default as useGlobalProps } from './useGlobalProps';
