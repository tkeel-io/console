import 'dayjs/locale/zh-cn';

import type { ConfigType } from 'dayjs';
import * as dayjs from 'dayjs';

dayjs.locale('zh-cn');

const DEFAULT_TEMPLATE = 'YYYY-MM-DD HH:mm:ss';

export function formatDateTime({
  date,
  template = DEFAULT_TEMPLATE,
}: {
  date?: dayjs.ConfigType;
  template?: string;
} = {}): string {
  return dayjs(date).format(template);
}

export function formatDateTimeByTimestamp({
  timestamp,
  template = DEFAULT_TEMPLATE,
}: {
  timestamp?: number | string;
  template?: string;
} = {}) {
  return formatDateTime({
    date: timestamp ? Number(timestamp) : undefined,
    template,
  });
}

export function getTimestamp(options?: { date?: ConfigType }) {
  const date = options?.date;
  return dayjs(date).valueOf();
}
