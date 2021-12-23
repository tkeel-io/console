import React from 'react';
import { Theme, useTheme } from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';

import { filledIconDefaultProps } from './default-props';
import { FilledIconPropsWithSvgComponent } from './types';

function FilledIcon({
  mode,
  size,
  color,
  className,
  style,
  svgComponent: SvgComponent,
  onClick,
}: FilledIconPropsWithSvgComponent): JSX.Element {
  const theme: Theme = useTheme();
  const { colors } = theme;
  const themeColor =
    typeof color === 'string' ? (getColor(theme, color, color) as string) : '';
  const modeColors = {
    dark: colors.white,
    light: colors.gray['700'],
  };
  const modeColor = mode === 'dark' ? modeColors.dark : modeColors.light;

  return (
    <SvgComponent
      mode={mode}
      width={size}
      height={size}
      className={className}
      style={{ fill: themeColor || modeColor, ...style }}
      onClick={onClick}
    />
  );
}

FilledIcon.defaultProps = filledIconDefaultProps;

export default FilledIcon;
