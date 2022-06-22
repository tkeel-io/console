import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { useTooltipProps } from '@tkeel/console-charts';
import { useColors } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

interface Props {
  data: { x: number; y: number }[];
  yFormatter?: (value: number) => string;
}

export default function AreaChart({ data, yFormatter }: Props) {
  const colors = useColors();
  const defaultTooltipProps = useTooltipProps();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        data={data}
        margin={{ top: 2, right: 0, bottom: 0, left: 0 }}
      >
        <Area dataKey="y" stroke={colors.primary} fill={colors.brand[50]} />
        <XAxis hide dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
        <Tooltip
          {...defaultTooltipProps}
          labelFormatter={(label: number) =>
            formatDateTimeByTimestamp({ timestamp: label * 1000 })
          }
          formatter={(value: number) => {
            if (typeof yFormatter === 'function') {
              return [yFormatter(value), ''];
            }

            return [value, ''];
          }}
          separator=""
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
