import { merge } from 'lodash';
import type { SVGProps } from 'react';

import { useColor } from '@tkeel/console-hooks';

import { DEFAULT_PROPS } from './constants';

export function useAxisProps() {
  const stroke = useColor('gray.300');
  const fill = useColor('gray.500');

  const axisLine: SVGProps<SVGLineElement> = { stroke };
  const tickLine: SVGProps<SVGTextElement> = { stroke };
  const tick: SVGProps<SVGTextElement> = { fill };

  const colorProps = {
    axisLine,
    tickLine,
    tick,
  };

  return merge({}, DEFAULT_PROPS, colorProps);
}
