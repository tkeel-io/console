import { Flex, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { Checkbox } from '@tkeel/console-components';
import { CheckFilledIcon } from '@tkeel/console-icons';

export interface PlatformCondition {
  label: string;
  value: string;
}

interface Props {
  conditions: PlatformCondition[];
  onChange: (condition: PlatformCondition[]) => void;
}

export default function PlatformRuleDescriptionCard({
  conditions,
  onChange,
}: Props) {
  const data = [
    {
      label: '当前账号每秒发送设备的请求达到上限',
      value: '当前账号每秒发送设备的请求达到上限',
    },
    {
      label: '边端应用升级失败',
      value: '边端应用升级失败',
    },
    {
      label: '驱动安装失败',
      value: '驱动安装失败',
    },
  ];

  const handleConditionClick = (condition: PlatformCondition) => {
    const { value } = condition;
    const hasSelected = conditions.some((item) => item.value === value);
    if (hasSelected) {
      onChange(conditions.filter((item) => item.value !== value));
    } else {
      onChange([...conditions, condition]);
    }
  };

  return (
    <Flex flex="1" flexDirection="column">
      <Flex justifyContent="space-between">
        <Text color="gray.700" fontSize="14px">
          满足条件时，触发告警。
        </Text>
        <Checkbox
          color="gray.700"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newData = e.target.checked ? data : [];
            onChange(newData);
          }}
        >
          全选
        </Checkbox>
      </Flex>
      <Flex marginTop="8px" justifyContent="space-between" flexWrap="wrap">
        {data.map((item) => {
          const { label, value } = item;
          const selected = conditions.some(
            (condition) => condition.value === value
          );
          return (
            <Flex
              key={value}
              marginTop="12px"
              paddingX="20px"
              justifyContent="space-between"
              alignItems="center"
              width="326px"
              height="44px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor={selected ? 'primary' : 'transparent'}
              borderRadius="4px"
              backgroundColor={selected ? 'brand.50' : 'white'}
              cursor="pointer"
              onClick={() => handleConditionClick(item)}
            >
              <Text
                maxWidth="260px"
                noOfLines={1}
                color="gray.700"
                fontSize="14px"
                title={label}
              >
                {label}
              </Text>
              {selected && <CheckFilledIcon color="primary" />}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
