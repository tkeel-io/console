import React from 'react';

import Download from '../../assets/icons/filled/download.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function DownloadFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Download} />;
}

export default DownloadFilledIcon;
