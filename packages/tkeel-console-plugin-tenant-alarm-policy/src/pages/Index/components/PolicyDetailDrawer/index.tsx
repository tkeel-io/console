import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

import {
  AlarmInfoCard,
  AlarmLevelTag,
  AlarmRuleTypeTag,
  NotificationObjectsInfoCard,
} from '@tkeel/console-business-components';
import {
  Clipboard,
  Drawer,
  MoreAction,
  NavigateToDeviceDetailInOtherPlugins,
  NavigateToDeviceTemplateDetailInOtherPlugins,
  Tooltip,
} from '@tkeel/console-components';
import { BoxTwoToneIcon, ComputingLampTwoToneIcon } from '@tkeel/console-icons';
import { useAlarmRuleDetailQuery } from '@tkeel/console-request-hooks';
import { AlarmSourceObject } from '@tkeel/console-types';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import { ALARM_TYPE_MAP } from '@/tkeel-console-plugin-tenant-alarm-policy/constants';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import SwitchStatusButton from '../SwitchStatusButton';

type Props = {
  ruleId: number;
  onClose: () => void;
  refetchData: () => void;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
function PolicyDetailDrawer({ ruleId, onClose, refetchData }: Props) {
  const { ruleDetail, refetch } = useAlarmRuleDetailQuery({ ruleId });
  const {
    alarmSourceObject,
    deviceId,
    deviceName,
    tempId,
    tempName,
    ruleName,
    alarmType,
    alarmRuleType,
    alarmLevel,
    ruleDesc,
  } = ruleDetail || {};

  let alarmSourceObjectValue: ReactNode = '-';
  let alarmSourceObjectIdValue: ReactNode = '-';
  if (alarmSourceObject === AlarmSourceObject.Device) {
    const name = deviceName || tempName;
    const alarmSourceObjectId = deviceId || tempId || '';
    const NavigateToOtherPlugin = deviceName
      ? NavigateToDeviceDetailInOtherPlugins
      : NavigateToDeviceTemplateDetailInOtherPlugins;

    alarmSourceObjectValue = (
      <Flex alignItems="center">
        {deviceName ? <ComputingLampTwoToneIcon /> : <BoxTwoToneIcon />}
        <Tooltip label={name}>
          <NavigateToOtherPlugin marginLeft="2px" id={alarmSourceObjectId}>
            <Text maxWidth="170px" noOfLines={1}>
              {name}
            </Text>
          </NavigateToOtherPlugin>
        </Tooltip>
      </Flex>
    );

    alarmSourceObjectIdValue = (
      <Flex>
        <Tooltip label={alarmSourceObjectId}>
          <Text width="140px" noOfLines={1}>
            {alarmSourceObjectId}
          </Text>
        </Tooltip>
        {alarmSourceObjectId && <Clipboard text={alarmSourceObjectId} />}
      </Flex>
    );
  } else if (alarmSourceObject === AlarmSourceObject.Platform) {
    alarmSourceObjectValue = '??????';
  }

  const alarmInfoArr = [
    {
      label: '??????????????????',
      value: ruleName,
    },
    {
      label: '????????????',
      value: alarmType === undefined ? '-' : ALARM_TYPE_MAP[alarmType],
    },
    {
      label: '??????????????????',
      value:
        alarmRuleType === undefined ? (
          '-'
        ) : (
          <AlarmRuleTypeTag type={alarmRuleType} />
        ),
    },
    {
      label: '????????????',
      value: alarmLevel ? <AlarmLevelTag level={alarmLevel} /> : '',
    },
    {
      label: '???????????????',
      value: alarmSourceObjectValue,
    },
    {
      label: '???????????????ID',
      value: alarmSourceObjectIdValue,
    },
    {
      label: '????????????',
      value: ruleDesc,
    },
  ];

  const titleStyle: StyleProps = {
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
  };

  const handleSuccess = () => {
    refetch();
    refetchData();
  };

  return (
    <Drawer
      id="policyDetail"
      isOpen
      title="??????????????????"
      width="700px"
      onClose={onClose}
    >
      <Flex flexDirection="column" padding="16px 32px">
        <Flex justifyContent="space-between">
          <Text {...titleStyle}>??????????????????</Text>
          <Flex alignItems="center">
            <Text color="gray.700" fontSize="12px" fontWeight="500">
              ?????????
            </Text>
            {ruleDetail && (
              <SwitchStatusButton
                status={ruleDetail?.enable}
                ruleId={ruleDetail?.ruleId}
                onSuccess={handleSuccess}
              />
            )}
            <MoreAction
              sx={{ marginLeft: '4px' }}
              styles={{ actionList: { width: '124px' } }}
              buttons={
                ruleDetail
                  ? [
                      <ModifyPolicyButton
                        key="modify"
                        policy={ruleDetail as Policy}
                        onSuccess={handleSuccess}
                      />,
                      <DeletePolicyButton
                        key="delete"
                        policy={ruleDetail as Policy}
                        onSuccess={handleSuccess}
                      />,
                    ]
                  : []
              }
            />
          </Flex>
        </Flex>
        <AlarmInfoCard info={alarmInfoArr} />
        <Text marginBottom="8px" {...titleStyle} marginTop="20px">
          ????????????
        </Text>
        <NotificationObjectsInfoCard noticeId={ruleDetail?.noticeId || ''} />
      </Flex>
    </Drawer>
  );
}

export default memo(PolicyDetailDrawer);
