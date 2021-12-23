import React from 'react';

import Loading from '../../assets/icons/filled/loading.svg?svgr';
import FilledIcon from '../Icon/FilledIcon';
import { FilledIconProps } from '../Icon/types';

function LoadingFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Loading} />;
}

export default LoadingFilledIcon;
