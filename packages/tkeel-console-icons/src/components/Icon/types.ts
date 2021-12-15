export interface IconProps {
  mode?: 'dark' | 'light';
  size?: string | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface IconTwoToneProps extends IconProps {
  twoToneColor?: string;
}

export interface IconPropsWithSvgComponent extends IconProps {
  svgComponent: React.FunctionComponent<any>;
}

export interface IconTwoTonePropsWithSvgComponent extends IconTwoToneProps {
  svgComponent: React.FunctionComponent<any>;
}
