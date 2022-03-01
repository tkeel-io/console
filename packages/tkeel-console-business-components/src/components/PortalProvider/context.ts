import { createContext } from 'react';

import { GlobalPortalProps } from './types';

const Context = createContext<GlobalPortalProps>({} as GlobalPortalProps);

export default Context;
