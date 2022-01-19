import { MouseEventHandler } from 'react';

export interface FilledIconProps {
  mode?: 'dark' | 'light';
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}

export interface TwoToneIconProps extends FilledIconProps {
  twoToneColor?: string;
}

export interface FilledIconPropsWithSvgComponent extends FilledIconProps {
  svgComponent: React.FunctionComponent<unknown>;
}

export interface TwoToneIconPropsWithSvgComponent extends TwoToneIconProps {
  svgComponent: React.FunctionComponent<unknown>;
}
