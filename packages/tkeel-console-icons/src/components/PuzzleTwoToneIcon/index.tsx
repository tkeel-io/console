import React from 'react';

import Puzzle from '@/tkeel-console-icons/assets/icons/two-tone/puzzle.svg?svgr';
import TwoToneIcon from '@/tkeel-console-icons/components/Icon/TwoToneIcon';
import { TwoToneIconProps } from '@/tkeel-console-icons/components/Icon/types';

function PuzzleTwoToneIcon(props: TwoToneIconProps) {
  return <TwoToneIcon {...props} svgComponent={Puzzle} />;
}

export default PuzzleTwoToneIcon;
