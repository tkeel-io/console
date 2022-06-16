import { StyleProps, Tag, TagLabel, TagProps } from '@chakra-ui/react';
import type { AlarmPolicyType } from 'packages/tkeel-console-plugin-tenant-alarms/src/types';

import { ALARMS_POLICY } from '@/tkeel-console-plugin-tenant-alarms/constants';

interface Props extends TagProps {
  type: AlarmPolicyType;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function AlarmPolicyTypeTag({ type, styles }: Props) {
  const { bgColor, label, color } = ALARMS_POLICY[type] || {};
  return (
    <Tag
      size="sm"
      bgColor={bgColor}
      color={color}
      fontSize="12px"
      px="2px"
      borderRadius="0"
      {...styles?.wrapper}
    >
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
}
