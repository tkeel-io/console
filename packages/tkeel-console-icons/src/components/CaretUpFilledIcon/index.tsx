import React from 'react';

import CaretUp from '../../assets/icons/filled/caret_up.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function CaretUpFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={CaretUp} />;
}

export default CaretUpFilledIcon;
