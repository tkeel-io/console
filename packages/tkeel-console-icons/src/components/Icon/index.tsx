import React from 'react';
// import { Theme, useTheme } from '@chakra-ui/react';

type Props = {
  theme?: 'dark' | 'light';
  size?: string | number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  svgComponent: React.FunctionComponent<any>;
};

const defaultProps = {
  theme: 'dark',
  size: 16,
  color: '',
  className: '',
  style: null,
};

function Icon({
  theme,
  size,
  color,
  className,
  style,
  svgComponent: SvgComponent,
}: Props): JSX.Element {
  // const { colors }: Theme = useTheme();

  return (
    <SvgComponent
      theme={theme}
      width={size}
      height={size}
      className={className}
      style={{ fill: color, ...style }}
    />
  );
}

Icon.defaultProps = defaultProps;

export default Icon;
