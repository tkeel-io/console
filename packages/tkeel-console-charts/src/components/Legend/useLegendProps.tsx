import { merge } from 'lodash';

import { DEFAULT_PROPS } from './constants';

export function useLegendProps() {
  return merge({}, DEFAULT_PROPS);
}
