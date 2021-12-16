export interface FilledIconProps {
  mode?: 'dark' | 'light';
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface TwoToneIconProps extends FilledIconProps {
  twoToneColor?: string;
}

export interface FilledIconPropsWithSvgComponent extends FilledIconProps {
  svgComponent: React.FunctionComponent<any>;
}

export interface TwoToneIconPropsWithSvgComponent extends TwoToneIconProps {
  svgComponent: React.FunctionComponent<any>;
}
