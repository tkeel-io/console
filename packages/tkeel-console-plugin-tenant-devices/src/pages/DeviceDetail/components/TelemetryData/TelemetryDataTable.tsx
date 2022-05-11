import { Flex, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { CellProps, Column } from 'react-table';

import {
  DeleteTelemetryButton,
  TelemetryDetailButton,
  UpdateTelemetryButton,
} from '@tkeel/console-business-components';
import { MoreAction, Table } from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';
import { TelemetryItem, TelemetryValue } from '@tkeel/console-types';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

interface TelemetryTableItem extends TelemetryItem {
  value?: string | number | boolean;
}

type Props = {
  deviceId: string;
  telemetryFields: TelemetryItem[];
  telemetryValues: TelemetryValue;
  refetch: () => void;
};

export default function TelemetryDataTable({
  deviceId,
  telemetryFields,
  refetch: refetchDeviceDetail,
  telemetryValues,
}: Props) {
  const operateCell = useCallback(
    ({ row }: CellProps<TelemetryItem>) => {
      const { original } = row;
      return (
        <MoreAction
          buttons={[
            <TelemetryDetailButton defaultValues={original} key="detail" />,
            <UpdateTelemetryButton
              key="modify"
              uid={deviceId}
              refetch={refetchDeviceDetail}
              defaultValues={original}
            />,
            <DeleteTelemetryButton
              key="delete"
              defaultValues={original}
              uid={deviceId}
              refetch={refetchDeviceDetail}
            />,
          ]}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: ReadonlyArray<Column<TelemetryTableItem>> = [
    {
      Header: '遥测名称',
      accessor: 'name',
      width: 160,
      Cell: useCallback(
        ({ value }: CellProps<TelemetryTableItem, string>) => (
          <Flex alignItems="center" justifyContent="space-between">
            <DuotoneTwoToneIcon />
            <Text
              color="gray.800"
              fontWeight="600"
              fontSize="12px"
              marginLeft="12px"
            >
              {value}
            </Text>
          </Flex>
        ),
        []
      ),
    },
    {
      Header: '遥测ID',
      width: 100,
      accessor: 'id',
    },
    {
      Header: '数据类型',
      width: 100,
      accessor: 'type',
    },
    {
      Header: '遥测值',
      width: 100,
      accessor: 'value',
    },
    {
      Header: '更新时间',
      accessor: 'last_time',
      width: 140,
      Cell: ({ value }: CellProps<TelemetryTableItem, number>) =>
        useMemo(
          () => (
            <Text fontSize="12px">
              {formatDateTimeByTimestamp({
                timestamp: value,
              })}
            </Text>
          ),
          [value]
        ),
    },
    {
      Header: '描述',
      width: 110,
      accessor: 'description',
    },

    {
      Header: '操作',
      width: 80,
      Cell: operateCell,
    },
  ];

  const telemetryTableData: TelemetryTableItem[] = telemetryFields.map(
    (item) => {
      const valueObject =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (telemetryValues[item.id] as {
          value?: string | number | boolean;
          ts?: number;
        }) || {};
      return {
        ...item,
        last_time: valueObject?.ts ?? item.last_time,
        value: valueObject?.value ?? '',
      };
    }
  );
  return (
    <Table
      scroll={{ y: '100%' }}
      styles={{
        wrapper: { flex: 1, height: '100%', overflow: 'hidden' },
        bodyTr: { fontSize: '12px' },
      }}
      columns={columns}
      data={telemetryTableData || []}
      isShowStripe
      hasPagination={false}
    />
  );
}
