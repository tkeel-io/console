import { Flex, StyleProps } from '@chakra-ui/react';
import type { AlarmStatus } from 'packages/tkeel-console-plugin-tenant-alarms/src/types';

import { ALARMS_STATUS } from '@/tkeel-console-plugin-tenant-alarms/constants';

import DotIcon from '../Dot';

interface Props {
  status: AlarmStatus;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function AlarmStatusTag({ status, styles }: Props) {
  const { label, color } = ALARMS_STATUS[status] || {};
  return (
    <Flex align="center" fontSize="12px" gap="4px" {...styles?.wrapper}>
      <DotIcon color={color} size="6px" />
      {label}
    </Flex>
  );
}
