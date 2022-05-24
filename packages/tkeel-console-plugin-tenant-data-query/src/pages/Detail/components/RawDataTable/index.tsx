import { Flex } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { CellProps, Column } from 'react-table';

import {
  RawDataConnectType,
  RawDataConnectTypeLabel,
} from '@tkeel/console-business-components';
import { AceEditor, Table } from '@tkeel/console-components';
import { UsePaginationReturnType } from '@tkeel/console-types';
import { hasJsonStructure } from '@tkeel/console-utils';

export type RawData = {
  mark: string;
  topic: string;
  timestamp: string;
  values: string;
};

type Props = {
  rawDataType: string;
  rawDataList: RawData[];
  pagination: UsePaginationReturnType;
  isLoading: boolean;
};

export default function RawDataTable({
  rawDataType,
  rawDataList,
  pagination,
  isLoading,
}: Props) {
  const connectCell = useCallback(
    ({ value }: CellProps<RawData>) => (
      <RawDataConnectTypeLabel connectType={value as RawDataConnectType} />
    ),
    []
  );

  const columns: ReadonlyArray<Column<RawData>> = useMemo(() => {
    return [
      {
        Header: '连接方式',
        accessor: 'mark',
        width: 100,
        Cell: connectCell,
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
  }, [connectCell]);

  const expandRow = useCallback(
    (rawData: RawData) => {
      const { values } = rawData;
      const isJsonStr = rawDataType === 'text' && hasJsonStructure(values);
      const language = isJsonStr ? 'json' : 'text';
      return (
        <Flex padding="8px" height="160px" backgroundColor="gray.100">
          <AceEditor
            theme="light"
            value={values}
            language={language}
            readOnly
            width="100%"
            height="100%"
          />
        </Flex>
      );
    },
    [rawDataType]
  );

  return (
    <Table
      styles={{
        wrapper: { flex: 1, overflow: 'hidden' },
        table: { padding: '0 20px' },
      }}
      columns={columns}
      data={rawDataList}
      isLoading={isLoading}
      isShowStripe
      expandRow={expandRow}
      scroll={{ y: '100%' }}
      paginationProps={{ ...pagination, showBoxShadow: true }}
    />
  );
}
