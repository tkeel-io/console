import { Box, Flex, Text } from '@chakra-ui/react';
import { some } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { CellProps, Column } from 'react-table';

import {
  DeleteTelemetryButton,
  SaveTelemetryButton,
  TelemetryDetailButtonWithoutDrawer,
  UpdateTelemetryButton,
} from '@tkeel/console-business-components';
import {
  MoreAction,
  Table,
  Tooltip,
  TooltipText,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { BoxFilledIcon, VpcFilledIcon } from '@tkeel/console-icons';
import { TelemetryItem, TelemetryValue } from '@tkeel/console-types';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { TELEMETRY_TABLE_PAGE_SIZE } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

import { useTelemetryTableRowDataStore } from '../../stores';

export interface TelemetryTableItem extends TelemetryItem {
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
  openTelemetryDetailDrawer: () => void;
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
  openTelemetryDetailDrawer,
}: Props) {
  const setTelemetryTableRowData = useTelemetryTableRowDataStore(
    (state) => state.setRowData
  );

  const renderName = useCallback(
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
  );

  const renderId = ({ value }: CellProps<TelemetryTableItem, string>) => (
    <TooltipText label={value} />
  );

  const renderValue = ({
    value,
  }: CellProps<TelemetryTableItem, string | number | boolean | undefined>) => (
    <TooltipText label={value} />
  );

  const renderLastTime = ({ value }: CellProps<TelemetryTableItem, number>) => (
    <Text fontSize="12px">
      {formatDateTimeByTimestamp({
        timestamp: value,
      })}
    </Text>
  );

  const renderDescription = ({
    value,
  }: CellProps<TelemetryTableItem, string>) => <TooltipText label={value} />;

  const renderActions = useCallback(
    ({ row }: CellProps<TelemetryItem>) => {
      const { original } = row;
      return (
        <MoreAction
          buttons={[
            <TelemetryDetailButtonWithoutDrawer
              key="detail"
              onClick={() => {
                setTelemetryTableRowData(original);
                openTelemetryDetailDrawer();
              }}
            />,
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
    [
      deleteCallback,
      deviceId,
      openTelemetryDetailDrawer,
      refetchDeviceDetail,
      setTelemetryTableRowData,
    ]
  );

  const columns: ReadonlyArray<Column<TelemetryTableItem>> = useMemo(
    () => [
      {
        Header: '遥测名称',
        accessor: 'name',
        width: 160,
        Cell: renderName,
      },
      {
        Header: '遥测ID',
        width: 100,
        accessor: 'id',
        Cell: renderId,
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
        Cell: renderValue,
      },
      {
        Header: '更新时间',
        accessor: 'last_time',
        width: 140,
        Cell: renderLastTime,
      },
      {
        Header: '描述',
        width: 110,
        accessor: 'description',
        Cell: renderDescription,
      },

      {
        Header: '操作',
        width: 80,
        Cell: renderActions,
      },
    ],
    [renderActions, renderName]
  );

  const pagination = usePagination({ pageSize: TELEMETRY_TABLE_PAGE_SIZE });
  const { pageNum, pageSize, setTotalSize } = pagination;
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;

  const telemetryTableData: TelemetryTableItem[] = useMemo(
    () =>
      telemetryFields.map((item) => {
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
      }),
    [telemetryFields, telemetryValues]
  );
  const data = useMemo(
    () => telemetryTableData.slice(start, end),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [end, start, JSON.stringify(telemetryTableData)]
  );

  useEffect(() => {
    setTotalSize(telemetryTableData.length);
  }, [setTotalSize, telemetryTableData.length]);

  return (
    <Table
      scroll={{ y: '100%' }}
      styles={{
        wrapper: { flex: 1, height: '100%', overflow: 'hidden' },
        bodyTr: { fontSize: '12px' },
      }}
      columns={columns}
      data={data}
      isShowStripe
      hasKeywords={hasKeywords}
      paginationProps={{ ...pagination, showPageSizeSelector: false }}
      onSelect={handleSelect}
    />
  );
}
