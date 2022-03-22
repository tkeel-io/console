import { CSSProperties, FunctionComponent, MouseEventHandler } from 'react';

export interface FilledIconProps {
  mode?: 'dark' | 'light';
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}

export interface TwoToneIconProps extends FilledIconProps {
  twoToneColor?: string;
}

export interface FilledIconPropsWithSvgComponent extends FilledIconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgComponent: FunctionComponent<any>;
}

export interface TwoToneIconPropsWithSvgComponent extends TwoToneIconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgComponent: FunctionComponent<any>;
}
