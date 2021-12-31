import React from 'react';

import Box from '@/tkeel-console-icons/assets/icons/two-tone/box.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function BoxTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Box} />;
}

export default BoxTwoToneIcon;
