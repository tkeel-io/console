import { noop } from 'lodash';
import { createContext } from 'react';

import type { GlobalPortalValue } from './types';

const defaultValue: GlobalPortalValue = {
  documents: {
    isOpen: false,
    baseURL: '',
    path: '',
    setIsOpen: noop,
    setPath: noop,
  },
};

export default createContext<GlobalPortalValue>(defaultValue);
