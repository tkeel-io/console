import React from 'react';

import Bell from '../../assets/icons/filled/bell.svg?svgr';
import IconFilled from '../Icon/IconFilled';
import { IconFilledProps } from '../Icon/types';

function BellIconFilled(props: IconFilledProps) {
  return <IconFilled {...props} svgComponent={Bell} />;
}

export default BellIconFilled;
