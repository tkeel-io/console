import React from 'react';

import Bell from '@/tkeel-console-icons/assets/icons/two-tone/bell.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function BellTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Bell} />;
}

export default BellTwoToneIcon;
