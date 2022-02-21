/* eslint-disable no-console */
import { useMemo } from 'react';
import { Cell, Column } from 'react-table';
import { Link, Text } from '@chakra-ui/react';
import {
  // PageHeaderToolbar,
  Table,
  // toast,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useDeviceListQuery, {
  DeviceApiItem,
  DeviceItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';
import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

interface Props {
  groupItem: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
}

function DeviceListTable({ groupItem }: Props): JSX.Element {
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const { nodeInfo } = groupItem;
  console.log(nodeInfo.id);
  const params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'name',
    is_descending: false,
    query: '',
    condition: [
      {
        field: 'sysField._spacePath',
        operator: '$wildcard',
        value: nodeInfo.id,
        // '6ce4280c-3e00-44c0-a544-8845de77eb28',
      },
      {
        field: 'type',
        operator: '$eq',
        value: 'device',
      },
    ],
  };
  const { deviceList, isLoading } = useDeviceListQuery({
    params,
    onSuccess: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const total = data?.data?.listDeviceObject?.total ?? 0;
      setTotalSize(total as number);
    },
  });
  const deviceTableData = deviceList.map((item: DeviceApiItem) => {
    const { id, properties } = item;
    const { basicInfo, sysField } = properties;
    const { name, directConnection, templateId, selfLearn } = basicInfo;
    const { _createdAt: createTime, _status: status } = sysField;
    return {
      id,
      name,
      directConnection,
      templateId,
      selfLearn,
      status,
      createTime,
      originData: item,
    };
  });
  const columns: ReadonlyArray<Column<DeviceItem>> = [
    {
      Header: '设备名称',
      Cell: ({ row }: Cell<DeviceItem>) =>
        useMemo(() => {
          const { original } = row;
          const { id } = original;
          return (
            <Link
              href={`/tenant-devices/detail?id=${id}`}
              color="gray.600"
              fontWeight="600"
              _hover={{ color: 'primary' }}
            >
              {original.name}
            </Link>
          );
        }, [row]),
    },
    {
      Header: '连接方式',
      accessor: 'directConnection',
      Cell({ value }: { value: boolean }) {
        return value ? '直连' : '非直连';
      },
    },
    {
      Header: '设备模版',
      accessor: 'templateId',
      Cell({ value }: { value: string }) {
        return value.slice(-9, -1);
      },
    },
    {
      Header: '设备状态',
      accessor: 'status',
      Cell({ value }: { value: boolean }) {
        return value ? '在线' : '离线';
      },
    },
    {
      Header: '创建时间',
      accessor: 'createTime',
      Cell: ({ value }: { value: number }) =>
        useMemo(
          () => (
            <Text minWidth="180px" fontSize="12px" color="gray.600">
              {value
                ? // eslint-disable-next-line unicorn/numeric-separators-style
                  formatDateTimeByTimestamp({ timestamp: value })
                : ''}
            </Text>
          ),
          [value]
        ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={deviceTableData}
      scroll={{ y: '100%' }}
      paginationProps={pagination}
      isLoading={isLoading as boolean}
      style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
    />
  );
}
export default DeviceListTable;
