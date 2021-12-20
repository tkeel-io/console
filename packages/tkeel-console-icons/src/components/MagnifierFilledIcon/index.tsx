import React from 'react';

import Magnifier from '../../assets/icons/filled/magnifier.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function MagnifierFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Magnifier} />;
}

export default MagnifierFilledIcon;
