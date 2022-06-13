import { merge } from 'lodash';

import { useColor } from '@tkeel/console-hooks';

import { DEFAULT_PROPS } from './constants';

export function useTooltipProps() {
  const contentBackgroundColor = useColor('gray.700');
  const itemColor = useColor('white');
  const labelColor = useColor('white');

  const colorProps = {
    contentStyle: {
      backgroundColor: contentBackgroundColor,
    },
    itemStyle: {
      color: itemColor,
    },
    labelStyle: {
      color: labelColor,
    },
  };

  return merge({}, DEFAULT_PROPS, colorProps);
}
