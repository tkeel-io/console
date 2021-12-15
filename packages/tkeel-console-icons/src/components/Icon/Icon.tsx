import React from 'react';

import { defaultProps } from './default-props';
import { IconPropsWithSvgComponent } from './types';

function Icon({
  mode,
  size,
  color,
  className,
  style,
  svgComponent: SvgComponent,
}: IconPropsWithSvgComponent): JSX.Element {
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

Icon.defaultProps = defaultProps;

export default Icon;
