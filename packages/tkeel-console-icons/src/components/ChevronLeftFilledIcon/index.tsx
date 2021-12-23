import React from 'react';

import ChevronLeft from '../../assets/icons/filled/chevron_left.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function ChevronLeftFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronLeft} />;
}

export default ChevronLeftFilledIcon;
