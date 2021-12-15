import React from 'react';

import Bell from '../../assets/icons/two-tone/bell.svg?svgr';
import IconTwoTone from '../Icon/IconTwoTone';
import { IconTwoToneProps } from '../Icon/types';

function BellIconTwoTone(props: IconTwoToneProps) {
  return <IconTwoTone {...props} svgComponent={Bell} />;
}

export default BellIconTwoTone;
