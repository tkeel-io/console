import React from 'react';

import CaretDown from '../../assets/icons/filled/caret_down.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function CaretDownFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={CaretDown} />;
}

export default CaretDownFilledIcon;
