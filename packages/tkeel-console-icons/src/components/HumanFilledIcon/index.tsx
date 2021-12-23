import React from 'react';

import Human from '../../assets/icons/filled/human.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function HumanFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Human} />;
}

export default HumanFilledIcon;
