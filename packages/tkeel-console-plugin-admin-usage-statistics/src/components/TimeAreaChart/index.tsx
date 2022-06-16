import { Skeleton } from '@chakra-ui/react';
import { find, merge } from 'lodash';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useCartesianGridProps,
  useLegendProps,
  useTooltipProps,
  useXAxisProps,
  useYAxisProps,
} from '@tkeel/console-charts';
import { Empty } from '@tkeel/console-components';
import { useColors } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import { TimestampItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';
import { formatTimestampItems } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';

const TEMPLATE = 'HH:mm';

interface TimeAreaChartProps {
  data: TimestampItem[];
  dataKeys: {
    key: string;
    label?: string;
    fill?: string;
    fillOpacity?: number | string;
    stroke?: string;
  }[];
  valueFormatter?: (value: number) => number;
  isLoading?: boolean;
  areaChart?: {
    margin?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
  };
  xAxis?: {
    ticks?: number[];
  };
  yAxis?: {
    tickFormatter?: (value: number) => string;
  };
  area?: {
    fillOpacity?: number | string;
  };
  tooltip?: {
    formatterString?: string;
    formatterUnit?: string;
  };
}

const DEFAULT_PROPS_BASE: Partial<TimeAreaChartProps> = {
  areaChart: {
    margin: { top: 14 },
  },
  yAxis: {
    tickFormatter: (value: number) =>
      numeral.format({ input: value, formatter: '0 a' }),
  },
  tooltip: {
    formatterString: '0,0',
    formatterUnit: '',
  },
};

const DEFAULT_PROPS_SINGLE_DATA_KEY: Partial<TimeAreaChartProps> = {
  area: {
    fillOpacity: '0.5',
  },
};

const DEFAULT_PROPS_MULTI_DATA_KEYS: Partial<TimeAreaChartProps> = {
  area: {
    fillOpacity: '0.4',
  },
};

export type { TimeAreaChartProps };

export default function TimeAreaChart(props: TimeAreaChartProps) {
  const colors = useColors();
  const defaultFill = colors.brand[50];
  const defaultStroke = colors.primary;

  const { dataKeys: dks } = props;
  const dataKeyCount = dks.length;
  const {
    data,
    dataKeys,
    valueFormatter,
    isLoading,
    areaChart,
    xAxis,
    yAxis,
    area,
    tooltip,
  } = merge(
    {},
    DEFAULT_PROPS_BASE,
    dataKeyCount > 1
      ? DEFAULT_PROPS_MULTI_DATA_KEYS
      : DEFAULT_PROPS_SINGLE_DATA_KEY,
    props
  );
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const defaultLegendProps = useLegendProps();
  const defaultTooltipProps = useTooltipProps();

  const formattedData =
    typeof valueFormatter === 'function'
      ? formatTimestampItems({ data, formatter: valueFormatter })
      : data;

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  if (!(formattedData?.length > 0)) {
    return <Empty isFullHeight />;
  }

  return (
    <ResponsiveContainer>
      <AreaChart data={formattedData} {...areaChart}>
        <XAxis
          {...defaultXAxisProps}
          dataKey="timestamp"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(value: number) =>
            formatDateTimeByTimestamp({
              timestamp: value,
              template: TEMPLATE,
            })
          }
          scale="time"
          {...xAxis}
        />
        <YAxis {...defaultYAxisProps} allowDecimals={false} {...yAxis} />
        <CartesianGrid {...defaultCartesianGridProps} />
        {dataKeys.map(
          ({
            key,
            fill = defaultFill,
            fillOpacity,
            stroke = defaultStroke,
          }) => (
            <Area
              key={key}
              {...area}
              dataKey={key}
              fill={fill}
              fillOpacity={fillOpacity ?? area?.fillOpacity}
              stroke={stroke}
            />
          )
        )}
        <Legend
          {...defaultLegendProps}
          formatter={(value: string) => {
            const dataKeyItem = find(dataKeys, { key: value });
            return dataKeyItem?.label ?? '';
          }}
          wrapperStyle={{
            ...defaultLegendProps.wrapperStyle,
            visibility: dataKeyCount > 1 ? 'visible' : 'hidden',
          }}
        />
        <Tooltip
          {...defaultTooltipProps}
          labelFormatter={(label: number) =>
            formatDateTimeByTimestamp({
              timestamp: label,
              template: TEMPLATE,
            })
          }
          formatter={(value: number, name: string) => {
            const dataKeyItem = find(dataKeys, { key: name });
            const formatterString = tooltip?.formatterString;
            const formatterUnit = tooltip?.formatterUnit;
            const formattedValue = numeral.format({
              input: value,
              formatter: formatterString,
            });
            const formattedValueWithUnit = formatterUnit
              ? [formattedValue, formatterUnit].join(' ')
              : formattedValue;
            return [formattedValueWithUnit, dataKeyItem?.label];
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
