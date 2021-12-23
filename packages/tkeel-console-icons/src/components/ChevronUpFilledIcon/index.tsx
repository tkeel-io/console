import React from 'react';

import ChevronUp from '../../assets/icons/filled/chevron_up.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function ChevronUpFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronUp} />;
}

export default ChevronUpFilledIcon;
