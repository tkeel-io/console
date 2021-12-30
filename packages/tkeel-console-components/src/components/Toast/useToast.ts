import { useToast, UseToastOptions } from '@chakra-ui/react';
import { merge } from 'lodash';

import DEFAULT_OPTIONS from './defaults';

export default function useCustomToast(options: UseToastOptions) {
  const opts = merge({}, DEFAULT_OPTIONS, options);
  return useToast(opts);
}
