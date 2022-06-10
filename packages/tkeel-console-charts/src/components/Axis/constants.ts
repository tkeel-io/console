import type { SVGProps } from 'react';

const AXIS_LINE: SVGProps<SVGLineElement> = {
  strokeWidth: '1px',
};

const TICK_LINE: SVGProps<SVGTextElement> = {
  strokeWidth: '1px',
};

const TICK_SIZE = 4;

const TICK: SVGProps<SVGTextElement> = {
  fontSize: '12px',
};

export const DEFAULT_PROPS = {
  axisLine: AXIS_LINE,
  tickLine: TICK_LINE,
  tickSize: TICK_SIZE,
  tick: TICK,
};
