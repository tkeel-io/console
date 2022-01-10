import React from 'react';

import Collapse from '@/tkeel-console-icons/assets/icons/filled/collapse.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function CollapseFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Collapse} />;
}

export default CollapseFilledIcon;
