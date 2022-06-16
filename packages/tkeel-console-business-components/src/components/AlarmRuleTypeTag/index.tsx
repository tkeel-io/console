import { StyleProps, Tag, TagLabel, TagProps } from '@chakra-ui/react';

interface Props extends TagProps {
  type: 0 | 1;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function AlarmRuleTypeTag({ type, styles }: Props) {
  const ALARM_RULE_TYPE_INFO_MAP = {
    0: {
      label: '阈值告警',
      bgColor: 'violet.100',
      color: 'violet.400',
    },
    1: {
      label: '系统告警',
      bgColor: 'blue.50',
      color: 'blue.200',
    },
  };

  const { bgColor, color, label } = ALARM_RULE_TYPE_INFO_MAP[type];

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
