import type { SVGProps } from 'react';

export const AXIS_LINE: SVGProps<SVGLineElement> = {
  strokeWidth: '1px',
};

export const TICK_LINE: SVGProps<SVGTextElement> = {
  strokeWidth: '1px',
};

export const TICK_SIZE = 4;

export const TICK: SVGProps<SVGTextElement> = {
  fontSize: '12px',
};

export const DEFAULT_PROPS = {
  axisLine: AXIS_LINE,
  tickLine: TICK_LINE,
  tickSize: TICK_SIZE,
  tick: TICK,
};
