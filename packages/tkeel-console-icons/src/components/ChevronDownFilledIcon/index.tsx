import React from 'react';

import ChevronDown from '../../assets/icons/filled/chevron_down.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function ChevronDownFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronDown} />;
}

export default ChevronDownFilledIcon;
