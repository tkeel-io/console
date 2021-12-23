import React from 'react';

import Add from '../../assets/icons/filled/add.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function AddFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Add} />;
}

export default AddFilledIcon;
