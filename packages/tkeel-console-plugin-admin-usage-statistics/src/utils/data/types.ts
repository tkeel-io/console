import type { ManipulateType } from 'dayjs';

import type {
  TimestampItem,
  ValueItem,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface FillDataLastTimes {
  data: ValueItem[];
  unit: ManipulateType;
  timeValue: number;
}

type FillDataLastCommonTimes = Omit<FillDataLastTimes, 'unit' | 'timeValue'>;

interface FormatTimestampItemOptions {
  data: TimestampItem;
  formatter: (value: number) => number;
}

interface FormatTimestampItemsOptions {
  data: TimestampItem[];
  formatter: (value: number) => number;
}

export type {
  FillDataLastCommonTimes,
  FillDataLastTimes,
  FormatTimestampItemOptions,
  FormatTimestampItemsOptions,
};
