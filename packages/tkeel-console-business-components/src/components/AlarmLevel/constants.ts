import { ElementType } from 'react';

import {
  FireFilledIcon,
  InformationFilledIcon,
  LightningFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';
import type { AlarmLevel } from '@tkeel/console-types';

export const ALARM_LEVEL_MAP = {
  CRITICAL: 1,
  MAJOR: 2,
  MINOR: 3,
  WARNING: 4,
} as const;

export interface AlarmLevelInfo {
  icon: ElementType;
  label: string;
  bgColor: string;
}

export type AlarmLevelInfoMap = {
  [key in AlarmLevel]: AlarmLevelInfo;
};

export const ALARM_LEVEL_INFO_MAP: AlarmLevelInfoMap = {
  [ALARM_LEVEL_MAP.CRITICAL]: {
    icon: FireFilledIcon,
    label: '紧急',
    bgColor: 'red.200',
  },
  [ALARM_LEVEL_MAP.MAJOR]: {
    icon: LightningFilledIcon,
    label: '重要',
    bgColor: 'orange.300',
  },
  [ALARM_LEVEL_MAP.MINOR]: {
    icon: WarningFilledIcon,
    label: '次要',
    bgColor: 'teal.400',
  },
  [ALARM_LEVEL_MAP.WARNING]: {
    icon: InformationFilledIcon,
    label: '提示',
    bgColor: 'blue.300',
  },
};
