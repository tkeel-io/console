import React from 'react';

import Bell from '../../assets/icons/filled/bell.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function BellFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Bell} />;
}

export default BellFilledIcon;
