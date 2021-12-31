import React from 'react';

import Trash from '../../assets/icons/filled/trash.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function TrashFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Trash} />;
}

export default TrashFilledIcon;
