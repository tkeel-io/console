// import { Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Column } from 'react-table';

import {
  ConnectType,
  RawDataConnectTypeLabel,
} from '@tkeel/console-business-components';
import { Table } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

export type RawData = {
  mark: string;
  topic: string;
  timestamp: string;
};

type Props = {
  rawDataList: RawData[];
};

export default function RawDataTable({ rawDataList }: Props) {
  const pagination = usePagination();

  const columns: ReadonlyArray<Column<RawData>> = [
    {
      Header: '连接方式',
      accessor: 'mark',
      Cell: ({ value }) =>
        useMemo(
          () => <RawDataConnectTypeLabel connectType={value as ConnectType} />,
          [value]
        ),
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
      styles={{
        wrapper: { flex: 1, overflow: 'hidden' },
        table: { padding: '0 20px' },
        pagination: { padding: '0 20px' },
      }}
      columns={columns}
      data={rawDataList}
      isShowStripe
      scroll={{ y: '100%' }}
      paginationProps={{ ...pagination, showBoxShadow: true }}
    />
  );
}
