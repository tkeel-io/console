import React from 'react';

import Loading from '@/tkeel-console-icons/assets/icons/filled/loading.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function LoadingFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Loading} />;
}

export default LoadingFilledIcon;
