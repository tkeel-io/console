import React from 'react';

import Human from '@/tkeel-console-icons/assets/icons/filled/human.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function HumanFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={Human} />;
}

export default HumanFilledIcon;
