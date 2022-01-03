import React from 'react';

import ChevronRight from '@/tkeel-console-icons/assets/icons/filled/chevron_right.svg?svgr';
import FilledIcon from '@/tkeel-console-icons/components/Icon/FilledIcon';
import { FilledIconProps } from '@/tkeel-console-icons/components/Icon/types';

function ChevronRightFilledIcon(props: FilledIconProps) {
  return <FilledIcon {...props} svgComponent={ChevronRight} />;
}

export default ChevronRightFilledIcon;
