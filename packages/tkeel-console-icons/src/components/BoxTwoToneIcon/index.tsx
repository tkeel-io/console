import React from 'react';

import Box from '../../assets/icons/two-tone/box.svg?svgr';
import TwoToneIcon from '../Icon/TwoToneIcon';
import { TwoToneIconProps } from '../Icon/types';

function BoxTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Box} />;
}

export default BoxTwoToneIcon;
