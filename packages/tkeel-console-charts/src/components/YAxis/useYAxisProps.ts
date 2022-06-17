import { merge } from 'lodash';
import type { YAxisProps } from 'recharts';

import { useAxisProps } from '../Axis/useAxisProps';
import { DEFAULT_PROPS } from './constants';

export function useYAxisProps(): YAxisProps {
  const axisProps = useAxisProps();

  return merge({}, axisProps, DEFAULT_PROPS);
}
