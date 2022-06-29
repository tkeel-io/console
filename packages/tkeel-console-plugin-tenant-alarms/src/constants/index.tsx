import { Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  AlarmDetailType,
  AlarmPolicyType,
} from 'packages/tkeel-console-plugin-tenant-alarms/src/types';

import { AlarmRuleTypeTag } from '@tkeel/console-business-components';
import { Tooltip, TooltipText } from '@tkeel/console-components';
import {
  ComputingLampTwoToneIcon,
  FireFilledIcon,
  InformationFilledIcon,
  LightningFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';
// import { AlarmSourceObject } from '@tkeel/console-types';

// 告警级别 1-4 紧急-提示
// 告警类型 0 基础告警 1 持续告警
// 策略类型 0 阈值告警 1 系统告警
// 告警源   0 平台    1 设备
export const ALARMS_LEVEL = {
  1: {
    Icon: FireFilledIcon,
    label: '紧急',
    bgColor: 'red.200',
  },
  2: {
    Icon: LightningFilledIcon,
    label: '重要',
    bgColor: 'orange.300',
  },
  3: {
    Icon: WarningFilledIcon,
    label: '次要',
    bgColor: 'teal.400',
  },
  4: {
    Icon: InformationFilledIcon,
    label: '提示',
    bgColor: 'blue.300',
  },
};

export const ALARMS_LEVEL_ARR = Object.entries(ALARMS_LEVEL).map(([k, v]) => ({
  ...v,
  value: k,
}));

export interface AlarmPolicyTypes {
  label: string;
  bgColor: string;
  color: string;
  value: AlarmPolicyType;
}
export const ALARMS_POLICY: AlarmPolicyTypes[] = [
  {
    label: '阈值告警',
    bgColor: 'violet.100',
    color: 'violet.400',
    value: 0,
  },
  {
    label: '系统告警',
    bgColor: 'blue.50',
    color: 'blue.200',
    value: 1,
  },
];

export const ALARMS_TYPES = ['基础告警', '持续告警'];

export const ALARMS_SOURCE = [
  {
    label: '平台',
    value: '0',
  },
  {
    label: '设备',
    value: '1',
  },
];

export const AlarmInfoCardArr = (details: AlarmDetailType) => [
  {
    label: '告警源对象',
    value:
      details.alarmSource === 0 ? (
        ALARMS_SOURCE[0].label
      ) : (
        <Tooltip label={details?.deviceId}>
          <Flex alignItems="center" flex="1">
            <ComputingLampTwoToneIcon />
            <Text flex="1" ml="4px" noOfLines={1}>
              {details?.deviceId}
            </Text>
          </Flex>
        </Tooltip>
      ),
  },
  {
    label: '告警源对象ID',
    value: <TooltipText label={details?.objectId} />,
  },
  {
    label: '告警上报值',
    value: details?.alarmValue,
  },
  {
    label: '告警发生时间',
    value: dayjs.unix(details?.startTime || 0).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    label: '告警描述',
    value: <TooltipText label={details?.alarmDesc} />,
  },
];

export const AlarmPolicyInfoCardArr = (details: AlarmDetailType) => [
  {
    label: '告警策略名称',
    value: (
      <Text
        textDecoration="underline"
        cursor="pointer"
        onClick={() => {
          if (details.ruleId) {
            const { navigate } = plugin.getPortalProps().client;
            navigate(`/tenant-alarm-policy/?id=${details.ruleId}`);
          }
        }}
      >
        {details?.ruleName}
      </Text>
    ),
  },
  {
    label: '告警类型',
    value: ALARMS_TYPES[details.alarmType || 0] || '',
  },
  {
    label: '告警策略类型',
    value: <AlarmRuleTypeTag type={details.alarmStrategy || 0} />,
  },
  {
    label: '告警源对象',
    value: ALARMS_SOURCE[details.alarmSource || 0].label,
  },
  {
    label: '规则描述',
    value: <TooltipText label={details?.ruleDesc} />,
  },
];

export const ALARMS_STATUS = [
  {
    label: '未处理',
    color: 'red.300',
    value: '0',
  },
  {
    label: '已处理',
    color: 'success.300',
    value: '1',
  },
];
