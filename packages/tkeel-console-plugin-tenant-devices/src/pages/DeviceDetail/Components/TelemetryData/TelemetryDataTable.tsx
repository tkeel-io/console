import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Cell, Column } from 'react-table';

import { MoreAction, Table } from '@tkeel/console-components';
import { WebcamTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import {
  Telemetry,
  TelemetryItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import DeleteTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeleteTelemetryButton';
import DetailTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DetailTelemetryButton';
import EditTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/EditTelemetryButton';

interface TelemetryTableItem extends TelemetryItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

type Props = {
  deviceId: string;
  telemetryFields: TelemetryTableItem[];
  telemetryValues?: Telemetry;
  refetch: () => void;
};

export default function TelemetryDataTable({
  deviceId,
  telemetryFields,
  refetch: refetchDeviceDetail,
  telemetryValues,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: ReadonlyArray<Column<TelemetryTableItem>> = [
    {
      Header: '遥测名称',
      accessor: 'name',
      width: 160,
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <WebcamTwoToneIcon />
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
          [value]
        ),
    },
    {
      Header: '遥测ID',
      width: 100,
      accessor: 'id',
    },
    {
      Header: '数据类型',
      width: 90,
      accessor: 'type',
    },
    {
      Header: '遥测值',
      width: 120,
      accessor: 'value',
    },
    {
      Header: '时间戳',
      accessor: 'last_time',
      width: 140,
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Box>
              {formatDateTimeByTimestamp({
                timestamp: value,
              })}
            </Box>
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
      Cell: ({ row }: Cell<TelemetryItem>) =>
        useMemo(() => {
          const { original } = row;
          return (
            <MoreAction
              buttons={[
                <DetailTelemetryButton telemetryInfo={original} key="detail" />,
                <EditTelemetryButton
                  key="modify"
                  id={deviceId}
                  refetch={refetchDeviceDetail}
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
        }, [row]),
    },
  ];
  // eslint-disable-next-line no-console
  console.log(telemetryValues);
  // const telemetryTableData = telemetryFields.map((item) => {
  //   return {
  //     ...item,
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     value: telemetryValues[item.id] || '',
  //   };
  // });
  return (
    <Box>
      <Table
        styles={{ wrapper: { flex: 1, height: '100%', minHeight: '60vh' } }}
        columns={columns}
        data={telemetryFields || []}
        isShowStripe
        // isLoading={isLoading}
        // paginationProps={pagination}
      />
    </Box>
  );
}
