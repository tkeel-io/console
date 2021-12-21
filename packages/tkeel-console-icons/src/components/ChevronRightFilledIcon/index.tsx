import React from 'react';

import ChevronRight from '../../assets/icons/filled/chevron_right.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function ChevronRightFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronRight} />;
}

export default ChevronRightFilledIcon;
