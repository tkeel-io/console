import {
  FireFilledIcon,
  InformationFilledIcon,
  LightningFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';

import { CustomTagProps } from '../components/Tag';

export interface Config {
  [key: number | string]: CustomTagProps;
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
  default: {
    Icon: InformationFilledIcon,
    label: '提示',
    bgColor: 'blue.300',
  },
};

export const ALARMS_POLICY: Config = {
  system: {
    label: '系统告警',
    bgColor: 'blue.50',
    color: 'blue.200',
  },
  threshold: {
    label: '阈值告警',
    bgColor: 'violet.100',
    color: 'violet.400',
  },
  default: {
    label: '阈值告警',
    bgColor: 'white',
    color: 'black',
  },
};

export interface AlarmsStatusTypes {
  label: string;
  color: string;
}

export const ALARMS_STATUS: AlarmsStatusTypes[] = [
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
    alarm_rule_type: 'system',
    source: '平台',
    desc: '当前账号每s秒发送设备的请求达到上限',
    type: '基础告警',
    create_time: '2021-08-02 16:09:13',
    notice: 1,
    status: 0,
    id: 1,
  },
  {
    level: 2,
    alarm_rule_type: 'system',
    source: '平台',
    desc: '当前账号每秒发送设备的请2求达到上限',
    type: '基础告警',
    create_time: '2021-08-02 16:19:03',
    notice: 1,
    status: 1,
    id: 2,
  },
  {
    level: 3,
    alarm_rule_type: 'system',
    source: '平台',
    desc: '当前账号每秒发送设备的请求达w到上限',
    type: '基础告警',
    create_time: '2021-08-02 16:29:03',
    notice: 1,
    status: 1,
    id: 3,
  },
  {
    level: 4,
    alarm_rule_type: 'threshold',
    source: '平台',
    desc: '当前账号每秒发送设备d的请求达到上限',
    type: '基础告警',
    create_time: '2021-08-02 16:09:23',
    notice: 1,
    status: 1,
    id: 4,
  },
];

// export const alarmsTypesConfig = ['基础告警', '持续告警'];
