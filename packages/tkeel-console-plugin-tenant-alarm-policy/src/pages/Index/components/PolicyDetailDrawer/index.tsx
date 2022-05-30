import { Flex, Switch, Text } from '@chakra-ui/react';

import { Drawer, MoreAction } from '@tkeel/console-components';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import { ALARM_RULE_TYPE_MAP } from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

type Props = {
  policy: Policy;
  isOpen: boolean;
  onClose: () => void;
};

export default function PolicyDetailDrawer({ policy, isOpen, onClose }: Props) {
  const alarmInfoArr = [
    {
      label: '告警策略名称',
      value: policy.ruleName,
    },
    {
      label: '告警类型',
      value: policy.alarmType,
    },
    {
      label: '告警策略类型',
      value: ALARM_RULE_TYPE_MAP[policy.alarmRuleType] || '',
    },
    {
      label: '告警级别',
      value: policy.alarmLevel,
    },
    {
      label: '告警源对象',
      value: policy.alarmSourceObject,
    },
    {
      label: '告警源对象ID',
      value: policy.deviceId || '',
    },
    {
      label: '规则描述',
      value: policy.ruleDesc,
    },
  ];

  return (
    <Drawer
      title="告警策略详情"
      width="700px"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex flexDirection="column" padding="16px 32px">
        <Flex justifyContent="space-between">
          <Text>告警信息</Text>
          <Flex alignItems="center">
            <Text>状态：</Text>
            <Switch marginRight="10px" />
            <MoreAction
              styles={{ actionList: { width: '124px' } }}
              buttons={[
                <ModifyPolicyButton key="modify" />,
                <DeletePolicyButton
                  key="delete"
                  policy={policy}
                  onSuccess={() => {}}
                />,
              ]}
            />
          </Flex>
        </Flex>
        <Flex
          marginTop="12px"
          padding="12px 20px"
          flexWrap="wrap"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius="4px"
          backgroundColor="gray.50"
        >
          {alarmInfoArr.map(({ label, value }) => (
            <Flex key={label} width="50%" alignItems="center">
              <Text>{label}</Text>
              <Text>{value}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Drawer>
  );
}
