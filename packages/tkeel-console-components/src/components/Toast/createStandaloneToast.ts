import {
  createStandaloneToast,
  CreateStandAloneToastParam,
} from '@chakra-ui/react';
import { merge } from 'lodash';

import DEFAULT_OPTIONS from './defaults';

export default function createCustomStandaloneToast(
  param?: CreateStandAloneToastParam
) {
  const p = merge({}, { defaultOptions: DEFAULT_OPTIONS }, param);
  return createStandaloneToast(p);
}
