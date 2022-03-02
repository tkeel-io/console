import { createContext } from 'react';

import { GlobalPluginProps } from '@tkeel/console-types';

const Context = createContext<GlobalPluginProps>({} as GlobalPluginProps);

export default Context;
