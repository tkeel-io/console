import {
  FireFilledIcon,
  InformationFilledIcon,
  LightningFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';

import { CustomTagProps } from '../components/Tag';

interface Config {
  [key: string | number]: CustomTagProps;
}

export const ALARMS_LEVEL: Config = {
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

export const ALARMS_POLICY = [
  {
    label: '系统告警',
    bgColor: 'blue.50',
    color: 'blue.200',
  },
  {
    label: '阈值告警',
    bgColor: 'violet.100',
    color: 'violet.400',
  },
];

export const ALARMS_TYPES = ['基础告警', '持续告警'];

export const ALARMS_SOURCE = ['平台', '设备'];

// export interface AlarmsStatusTypes {
//   label: string;
//   color: string;
// }

export const ALARMS_STATUS = [
  {
    label: '未处理',
    color: 'red.300',
  },
  {
    label: '已处理',
    color: 'success.300',
  },
];

export const MOCK_DATA = [
  {
    level: 1,
    alarm_rule_type: 0,
    source: '平台',
    desc: '当前账号每s秒发送设备的请求达到上限',
    type: 0,
    create_time: '2021-08-02 16:09:13',
    notice: 1,
    status: 0,
    id: 1,
  },
  {
    level: 2,
    alarm_rule_type: 0,
    source: '平台',
    desc: '当前账号每秒发送设备的请2求达到上限',
    type: 0,
    create_time: '2021-08-02 16:19:03',
    notice: 1,
    status: 1,
    id: 2,
  },
  {
    level: 3,
    alarm_rule_type: 0,
    source: '平台',
    desc: '当前账号每秒发送设备的请求达w到上限',
    type: 0,
    create_time: '2021-08-02 16:29:03',
    notice: 1,
    status: 1,
    id: 3,
  },
  {
    level: 4,
    alarm_rule_type: 1,
    source: 'iot-2ou2i8412736812324242',
    desc: '当前账号每秒发送设备d的请求达到上限',
    type: 0,
    create_time: '2021-08-02 16:09:23',
    notice: 1,
    status: 1,
    id: 4,
  },
];

// export const alarmsTypesConfig = [0, '持续告警'];
