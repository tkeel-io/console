import React from 'react';
import { Theme, useTheme } from '@chakra-ui/react';

import { filledIconDefaultProps } from './default-props';
import { FilledIconPropsWithSvgComponent } from './types';

function FilledIcon({
  mode,
  size,
  color,
  className,
  style,
  svgComponent: SvgComponent,
}: FilledIconPropsWithSvgComponent): JSX.Element {
  const { colors }: Theme = useTheme();
  const modeColors = {
    dark: colors.white,
    light: colors.gray['700'],
  };
  const modeColor = mode === 'light' ? modeColors.light : modeColors.dark;

  return (
    <SvgComponent
      mode={mode}
      width={size}
      height={size}
      className={className}
      style={{ fill: color || modeColor, ...style }}
    />
  );
}

FilledIcon.defaultProps = filledIconDefaultProps;

export default FilledIcon;
