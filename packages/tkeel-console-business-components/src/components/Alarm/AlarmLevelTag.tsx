import { StyleProps, Tag, TagLabel, TagProps } from '@chakra-ui/react';

import type { AlarmLevel } from './constants';
import { ALARM_LEVEL_INFO_MAP } from './constants';

interface Props extends TagProps {
  level: AlarmLevel;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function AlarmLevelTag({ level, styles }: Props) {
  const { bgColor, icon: Icon, label } = ALARM_LEVEL_INFO_MAP[level] || {};
  return (
    <Tag
      size="sm"
      bgColor={bgColor}
      color="white"
      fontSize="12px"
      px="2px"
      borderRadius="0"
      {...styles?.wrapper}
    >
      <Icon color="white" />
      <TagLabel marginLeft="2px">{label}</TagLabel>
    </Tag>
  );
}
