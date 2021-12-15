import React from 'react';

import { twoToneDefaultProps } from './default-props';
import Icon from './Icon';
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
    <Icon
      {...rest}
      mode={mode}
      style={{ color: twoToneColor || modeTwoToneColor, ...style }}
    />
  );
}

IconTwoTone.defaultProps = twoToneDefaultProps;

export default IconTwoTone;
