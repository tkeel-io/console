import React from 'react';

import Bell from '../../assets/icons/filled/bell.svg?svgr';
import Icon from '../Icon/Icon';
import { IconProps } from '../Icon/types';

function BellIcon(props: IconProps) {
  return <Icon {...props} svgComponent={Bell} />;
}

export default BellIcon;
