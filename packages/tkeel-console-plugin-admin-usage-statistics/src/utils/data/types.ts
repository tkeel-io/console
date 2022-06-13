import type { ManipulateType } from 'dayjs';

import type { ValueItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface FillDataLastTimes {
  data: ValueItem[];
  unit: ManipulateType;
  timeValue: number;
}

type FillDataLastCommonTimes = Omit<FillDataLastTimes, 'unit' | 'timeValue'>;

export type { FillDataLastCommonTimes, FillDataLastTimes };
