import { createContext } from 'react';

import { GlobalProps } from './types';

const Context = createContext<GlobalProps>({} as GlobalProps);

export default Context;
