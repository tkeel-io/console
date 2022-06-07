import { Flex, Text } from '@chakra-ui/react';

import { Checkbox } from '@tkeel/console-components';

export interface PlatformCondition {
  label: string;
  value: string;
}

interface Props {
  value: PlatformCondition[];
  onChange: (condition: PlatformCondition[]) => void;
}

export default function PlatformRuleDescriptionCard({
  value,
  onChange,
}: Props) {
  const data = [
    {
      label: '当前账号每秒发送设备的请求达到上限',
      value: '当前账号每秒发送设备的请求达到上限',
    },
  ];

  return (
    <Flex flex="1" flexDirection="column">
      <Flex justifyContent="space-between">
        <Text color="gray.700" fontSize="14px">
          满足条件时，触发告警。
        </Text>
        <Checkbox
          color="gray.700"
          onClick={() => {
            const newData = value.length < data.length ? data : [];
            onChange(newData);
          }}
        >
          全选
        </Checkbox>
      </Flex>
    </Flex>
  );
}
