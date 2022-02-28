import 'dayjs/locale/zh-cn';

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
