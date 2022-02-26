import { createContext } from 'react';

import { PluginGlobalProps } from '@tkeel/console-types';

const Context = createContext<PluginGlobalProps>({} as PluginGlobalProps);

export default Context;
