import { Column } from 'react-table';

import { Table } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

type RawData = {
  mark: string;
  topic: string;
  timestamp: string;
};
export default function RawDataTable() {
  const pagination = usePagination();

  const rawDataList = [
    {
      mark: 'upstream',
      topic: 'v1/devices/me/tele1',
      timestamp: '1650787597000',
    },
  ];

  const columns: ReadonlyArray<Column<RawData>> = [
    {
      Header: '连接方式',
      accessor: 'mark',
      disableSortBy: true,
      Cell({ value }) {
        return value;
      },
    },
    {
      Header: 'topic',
      accessor: 'topic',
    },
    {
      Header: '时间',
      accessor: 'timestamp',
    },
  ];

  return (
    <Table
      styles={{ wrapper: { flex: 1, overflow: 'hidden' } }}
      columns={columns}
      data={rawDataList}
      isShowStripe
      scroll={{ y: '100%' }}
      paginationProps={{ ...pagination }}
    />
  );
}
