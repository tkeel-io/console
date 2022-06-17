import { Flex, StyleProps, Text } from '@chakra-ui/react';

import {
  AlarmInfoCard,
  AlarmLevelTag,
  AlarmRuleTypeTag,
  NotificationObjectsInfoCard,
} from '@tkeel/console-business-components';
import { Drawer, MoreAction, Tooltip } from '@tkeel/console-components';
import { ComputingLampTwoToneIcon } from '@tkeel/console-icons';
import { AlarmSourceObject } from '@tkeel/console-types';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import {
  ALARM_SOURCE_OBJECT_MAP,
  ALARM_TYPE_MAP,
} from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import SwitchStatusButton from '../SwitchStatusButton';

type Props = {
  policy: Policy;
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => unknown;
};

export default function PolicyDetailDrawer({
  policy,
  isOpen,
  onClose,
  refetchData,
}: Props) {
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
      value:
        policy.alarmSourceObject === AlarmSourceObject.Device ? (
          <Flex alignItems="center">
            <ComputingLampTwoToneIcon />
            <Tooltip label={policy.deviceName}>
              <Text marginLeft="2px" width="170px" noOfLines={1}>
                {policy.deviceName}
              </Text>
            </Tooltip>
          </Flex>
        ) : (
          ALARM_SOURCE_OBJECT_MAP[policy.alarmSourceObject] || ''
        ),
    },
    {
      label: '告警源对象ID',
      value: (
        <Tooltip label={policy.deviceId || ''}>
          <Text width="200px" noOfLines={1}>
            {policy.deviceId || '-'}
          </Text>
        </Tooltip>
      ),
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
            <Text color="gray.700" fontSize="12px" fontWeight="500">
              状态：
            </Text>
            <SwitchStatusButton
              status={policy.enable}
              ruleId={policy.ruleId}
              onSuccess={() => refetchData()}
            />
            <MoreAction
              styles={{ actionList: { width: '124px' } }}
              buttons={[
                <ModifyPolicyButton
                  key="modify"
                  policy={policy}
                  onSuccess={() => refetchData()}
                />,
                <DeletePolicyButton
                  key="delete"
                  policy={policy}
                  onSuccess={() => refetchData()}
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
