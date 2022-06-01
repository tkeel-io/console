import { Flex, StyleProps, Switch, Text } from '@chakra-ui/react';

import {
  AlarmInfoCard,
  AlarmLevelTag,
  AlarmRuleTypeTag,
  NotificationObjectsInfoCard,
} from '@tkeel/console-business-components';
import { Drawer, MoreAction } from '@tkeel/console-components';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import { ALARM_TYPE_MAP } from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
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
      value: ALARM_TYPE_MAP[policy.alarmType] || '',
    },
    {
      label: '告警策略类型',
      value: <AlarmRuleTypeTag type={policy.alarmRuleType} />,
    },
    {
      label: '告警级别',
      value: <AlarmLevelTag level={policy.alarmLevel} />,
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

  const titleStyle: StyleProps = {
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
  };

  return (
    <Drawer
      title="告警策略详情"
      width="700px"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex flexDirection="column" padding="16px 32px">
        <Flex justifyContent="space-between">
          <Text {...titleStyle}>告警信息</Text>
          <Flex alignItems="center">
            <Text>状态：</Text>
            <Switch size="sm" marginRight="10px" />
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
        <AlarmInfoCard info={alarmInfoArr} />
        <Text marginBottom="8px" {...titleStyle} marginTop="20px">
          通知对象
        </Text>
        <NotificationObjectsInfoCard />
      </Flex>
    </Drawer>
  );
}
