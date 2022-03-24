import { Flex, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { Cell, Column } from 'react-table';

import { MoreAction, Table } from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import {
  Telemetry,
  TelemetryItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import DeleteTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeleteTelemetryButton';
import DetailTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DetailTelemetryButton';
import EditTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/EditTelemetryButton';

interface TelemetryTableItem extends TelemetryItem {
  value?: string | number | boolean;
}

type Props = {
  deviceId: string;
  telemetryFields: TelemetryItem[];
  telemetryValues: Telemetry;
  refetch: () => void;
};

export default function TelemetryDataTable({
  deviceId,
  telemetryFields,
  refetch: refetchDeviceDetail,
  telemetryValues,
}: Props) {
  const operateCell = useCallback(
    ({ row }: Cell<TelemetryItem>) => {
      const { original } = row;
      return (
        <MoreAction
          buttons={[
            <DetailTelemetryButton telemetryInfo={original} key="detail" />,
            <EditTelemetryButton
              key="modify"
              id={deviceId}
              refetch={refetchDeviceDetail}
              defaultValues={original}
            />,
            <DeleteTelemetryButton
              key="delete"
              attributeInfo={{ name: original.name, id: original.id }}
              id={deviceId}
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
        ({ value }) => (
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
      Header: '时间戳',
      accessor: 'last_time',
      width: 140,
      Cell: ({ value }: { value: string }) =>
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
      width: 60,
      Cell: operateCell,
    },
  ];

  const telemetryTableData: TelemetryTableItem[] = telemetryFields.map(
    (item) => {
      const valueObject =
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
      styles={{
        wrapper: { flex: 1, height: '100%', minHeight: '60vh' },
        bodyTr: { fontSize: '12px' },
      }}
      columns={columns}
      data={telemetryTableData || []}
      isShowStripe
      // isLoading={isLoading}
      // paginationProps={pagination}
    />
  );
}
