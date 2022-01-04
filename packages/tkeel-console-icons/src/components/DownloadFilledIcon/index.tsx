import React from 'react';

import Download from '@/tkeel-console-icons/assets/icons/filled/download.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function DownloadFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Download} />;
}

export default DownloadFilledIcon;
