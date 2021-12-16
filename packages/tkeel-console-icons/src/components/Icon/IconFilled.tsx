import React from 'react';

import { iconFilledDefaultProps } from './default-props';
import { IconFilledPropsWithSvgComponent } from './types';

function IconFilled({
  mode,
  size,
  color,
  className,
  style,
  svgComponent: SvgComponent,
}: IconFilledPropsWithSvgComponent): JSX.Element {
  const modeColors = {
    dark: '#324558',
    light: '#f9fbfd',
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

IconFilled.defaultProps = iconFilledDefaultProps;

export default IconFilled;
