import type { StyleProps } from '@chakra-ui/react';

export const OPTIONS = [
  {
    value: 'sum_tkapi_request_7d',
    text: 'API 调用总次数',
    content: 0,
    formatter: '0,0',
  },
  {
    value: 'avg_tkapi_request_latency_7d',
    text: 'API 调用累积平均耗时 (ms)',
    content: 0,
    formatter: '0,0.00',
    convert: (value: number) => value * 1000,
  },
];

export const DEFAULT_VALUE = OPTIONS[0].value;

export const CHART_CONTAINER_STYLE: StyleProps = {
  height: '184px',
  padding: '16px 16px 0',
};
