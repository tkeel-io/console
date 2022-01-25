import * as dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

// eslint-disable-next-line import/prefer-default-export
export function formatDateTime({
  date,
  template = 'YYYY-MM-DD HH:mm:ss',
}: {
  date?: dayjs.ConfigType;
  template?: string;
} = {}) {
  return dayjs(date).format(template);
}
