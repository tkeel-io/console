import { Box, Flex, Text } from '@chakra-ui/react';
import { some } from 'lodash';
import { useCallback, useMemo } from 'react';
import { CellProps, Column } from 'react-table';

import {
  DeleteTelemetryButton,
  SaveTelemetryButton,
  TelemetryDetailButton,
  UpdateTelemetryButton,
} from '@tkeel/console-business-components';
import {
  MoreAction,
  Table,
  Tooltip,
  TooltipText,
} from '@tkeel/console-components';
import { BoxFilledIcon, VpcFilledIcon } from '@tkeel/console-icons';
import { TelemetryItem, TelemetryValue } from '@tkeel/console-types';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

interface TelemetryTableItem extends TelemetryItem {
  value?: string | number | boolean;
}

type Props = {
  deviceId: string;
  telemetryFields: TelemetryItem[];
  templateTelemetryFields?: TelemetryItem[];
  telemetryValues: TelemetryValue;
  hasKeywords: boolean;
  refetch: () => void;
  handleSelect: ({
    selectedFlatRows,
  }: {
    selectedFlatRows: TelemetryItem[];
  }) => void;
  deleteCallback?: (selectedDevices: TelemetryItem[]) => void;
};

export default function TelemetryDataTable({
  deviceId,
  telemetryFields,
  templateTelemetryFields = [],
  hasKeywords,
  refetch: refetchDeviceDetail,
  telemetryValues,
  handleSelect,
  deleteCallback,
}: Props) {
  const operateCell = useCallback(
    ({ row }: CellProps<TelemetryItem>) => {
      const { original } = row;
      return (
        <MoreAction
          buttons={[
            <TelemetryDetailButton defaultValues={original} key="detail" />,
            <SaveTelemetryButton
              key="save"
              uid={deviceId}
              selectedDevices={[original]}
              refetch={refetchDeviceDetail}
              source="device"
            />,
            <UpdateTelemetryButton
              key="modify"
              uid={deviceId}
              refetch={refetchDeviceDetail}
              defaultValues={original}
              source="device"
            />,
            <DeleteTelemetryButton
              key="delete"
              selectedDevices={[original]}
              uid={deviceId}
              refetch={refetchDeviceDetail}
              deleteCallback={deleteCallback}
              source="device"
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
        ({ value, row }: CellProps<TelemetryTableItem, string>) => {
          const { original } = row;
          return (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              overflow="hidden"
            >
              <Box flexShrink={0}>
                {some(
                  templateTelemetryFields,
                  (current) => current.id === original.id
                ) ? (
                  <Tooltip label="模板属性">
                    <BoxFilledIcon color="primary" />
                  </Tooltip>
                ) : (
                  <Tooltip label="自学习属性">
                    <VpcFilledIcon />
                  </Tooltip>
                )}
              </Box>
              <TooltipText
                label={value}
                color="gray.800"
                fontWeight="600"
                fontSize="12px"
                marginLeft="12px"
              />
            </Flex>
          );
        },
        [templateTelemetryFields]
      ),
    },
    {
      Header: '遥测ID',
      width: 100,
      accessor: 'id',
      Cell: useCallback(
        ({ value }: CellProps<TelemetryTableItem, string>) => (
          <TooltipText label={value} />
        ),
        []
      ),
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
      Cell: useCallback(
        ({
          value,
        }: CellProps<
          TelemetryTableItem,
          string | number | boolean | undefined
        >) => <TooltipText label={value} />,
        []
      ),
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
      Cell: useCallback(
        ({ value }: CellProps<TelemetryTableItem, string>) => (
          <TooltipText label={value} />
        ),
        []
      ),
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
      onSelect={handleSelect}
      data={telemetryTableData || []}
      isShowStripe
      hasPagination={false}
      hasKeywords={hasKeywords}
    />
  );
}
