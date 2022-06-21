import { merge } from 'lodash';
import type { XAxisProps } from 'recharts';

import { useAxisProps } from '../Axis/useAxisProps';
import { DEFAULT_PROPS } from './constants';

export function useXAxisProps(): XAxisProps {
  const axisProps = useAxisProps();

  return merge({}, axisProps, DEFAULT_PROPS);
}
