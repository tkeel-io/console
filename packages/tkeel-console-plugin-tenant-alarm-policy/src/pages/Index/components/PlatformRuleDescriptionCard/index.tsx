import { Flex, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { Checkbox } from '@tkeel/console-components';
import { CheckFilledIcon } from '@tkeel/console-icons';

import type { PlatformRule } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';

interface Props {
  rules: PlatformRule[];
  selectedRules: PlatformRule[];
  isShowPlatformRuleListError: boolean;
  onChange: (condition: PlatformRule[]) => void;
}

export default function PlatformRuleDescriptionCard({
  rules,
  selectedRules,
  isShowPlatformRuleListError,
  onChange,
}: Props) {
  const handleConditionClick = (condition: PlatformRule) => {
    const { promQl } = condition;
    const hasSelected = selectedRules.some((rule) => rule.promQl === promQl);
    if (hasSelected) {
      onChange(selectedRules.filter((rule) => rule.promQl !== promQl));
    } else {
      onChange([...selectedRules, condition]);
    }
  };

  const allChecked = rules.length > 0 && selectedRules.length === rules.length;

  return (
    <Flex flex="1" flexDirection="column">
      <Flex justifyContent="space-between">
        <Text color="gray.700" fontSize="14px">
          满足以下任意一个条件时，触发告警。
        </Text>
        <Checkbox
          color="gray.700"
          isChecked={allChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newPlatformRules = e.target.checked ? rules : [];
            onChange(newPlatformRules);
          }}
        >
          全选
        </Checkbox>
      </Flex>
      <Flex marginTop="8px" justifyContent="space-between" flexWrap="wrap">
        {rules.map((rule) => {
          const { alarmDesc, promQl } = rule;
          const selected = selectedRules.some(
            (condition) => condition.promQl === promQl
          );
          return (
            <Flex
              key={promQl}
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
              onClick={() => handleConditionClick(rule)}
            >
              <Text
                maxWidth="260px"
                noOfLines={1}
                color="gray.700"
                fontSize="14px"
                title={alarmDesc}
              >
                {alarmDesc}
              </Text>
              {selected && <CheckFilledIcon color="primary" />}
            </Flex>
          );
        })}
      </Flex>
      {isShowPlatformRuleListError && (
        <Text marginTop="6px" color="red.500" fontSize="14px">
          请选择一条或多条触发告警条件
        </Text>
      )}
    </Flex>
  );
}
