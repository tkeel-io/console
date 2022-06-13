import type { SVGProps } from 'react';

interface Props {
  axisLine: SVGProps<SVGLineElement>;
  tickLine: SVGProps<SVGTextElement>;
  tickSize: number;
  tick: SVGProps<SVGTextElement>;
}

export const DEFAULT_PROPS: Props = {
  axisLine: {
    strokeWidth: '1px',
  },
  tickLine: {
    strokeWidth: '1px',
  },
  tickSize: 4,
  tick: {
    fontSize: '12px',
  },
};
