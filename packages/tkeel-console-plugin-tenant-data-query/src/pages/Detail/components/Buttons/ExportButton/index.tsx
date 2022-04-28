import * as dayjs from 'dayjs';
import { CSVLink } from 'react-csv';

import { IconButton } from '@tkeel/console-components';
import { DownloadFilledIcon } from '@tkeel/console-icons';

type Props = {
  exportData: {
    [key: string]: unknown;
  }[];
  disabled: boolean;
};

export default function ExportButton({ exportData, disabled }: Props) {
  return (
    <CSVLink data={exportData} filename={`data-${dayjs().valueOf()}.csv`}>
      <IconButton
        paddingLeft="6px"
        paddingRight="16px"
        icon={<DownloadFilledIcon size={14} />}
        isShowCircle
        disabled={disabled}
      >
        数据导出
      </IconButton>
    </CSVLink>
  );
}
