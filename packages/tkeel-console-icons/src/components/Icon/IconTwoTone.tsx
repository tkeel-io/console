import React from 'react';

import { iconTwoToneDefaultProps } from './default-props';
import IconFilled from './IconFilled';
import { IconTwoTonePropsWithSvgComponent } from './types';

function IconTwoTone({
  mode,
  twoToneColor,
  style,
  ...rest
}: IconTwoTonePropsWithSvgComponent): JSX.Element {
  const modeTwoToneColors = {
    dark: '#b6c2cd',
    light: '#000',
  };
  const modeTwoToneColor =
    mode === 'light' ? modeTwoToneColors.light : modeTwoToneColors.dark;

  return (
    <IconFilled
      {...rest}
      mode={mode}
      style={{ color: twoToneColor || modeTwoToneColor, ...style }}
    />
  );
}

IconTwoTone.defaultProps = iconTwoToneDefaultProps;

export default IconTwoTone;
