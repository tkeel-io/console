import React from 'react';

import Bell from '../../assets/icons/two-tone/bell.svg?svgr';
import TwoToneIcon from '../Icon/TwoToneIcon';
import { TwoToneIconProps } from '../Icon/types';

function BellTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Bell} />;
}

export default BellTwoToneIcon;
