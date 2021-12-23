import React from 'react';

import AppsAdd from '../../assets/icons/filled/apps_add.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function AppsAddFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={AppsAdd} />;
}

export default AppsAddFilledIcon;
