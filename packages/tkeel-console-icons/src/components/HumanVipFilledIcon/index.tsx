import React from 'react';

import HumanVip from '../../assets/icons/filled/human_vip.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function HumanVipFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={HumanVip} />;
}

export default HumanVipFilledIcon;
