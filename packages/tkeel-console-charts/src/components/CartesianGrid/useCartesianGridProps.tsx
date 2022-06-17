import { merge } from 'lodash';

import { useColor } from '@tkeel/console-hooks';

import { DEFAULT_PROPS } from './constants';

export function useCartesianGridProps() {
  const stroke = useColor('gray.100');
  const colorProps = { stroke };

  return merge({}, DEFAULT_PROPS, colorProps);
}
