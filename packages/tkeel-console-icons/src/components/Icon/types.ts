export interface IconFilledProps {
  mode?: 'dark' | 'light';
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface IconTwoToneProps extends IconFilledProps {
  twoToneColor?: string;
}

export interface IconFilledPropsWithSvgComponent extends IconFilledProps {
  svgComponent: React.FunctionComponent<any>;
}

export interface IconTwoTonePropsWithSvgComponent extends IconTwoToneProps {
  svgComponent: React.FunctionComponent<any>;
}
