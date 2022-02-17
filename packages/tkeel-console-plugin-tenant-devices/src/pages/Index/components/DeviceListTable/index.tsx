/* eslint-disable no-console */
// import { useMemo } from 'react';
import { Cell, Column } from 'react-table';
import { Flex, Link } from '@chakra-ui/react';
import {
  // PageHeaderToolbar,
  Table,
  // toast,
} from '@tkeel/console-components';

// import { formatDateTimeByTimestamp } from '@tkeel/console-utils';
// import { usePagination } from '@tkeel/console-hooks';
import useDeviceListQuery, {
  DeviceApiItem,
  DeviceItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';

function DeviceListTable(): JSX.Element {
  const params = {
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
    query: '',
    condition: [
      {
        field: 'sysField._spacePath',
        operator: '$wildcard',
        value: '6ce4280c-3e00-44c0-a544-8845de77eb28',
      },
      {
        field: 'type',
        operator: '$eq',
        value: 'device',
      },
    ],
  };
  const { deviceList } = useDeviceListQuery({ params });

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
  console.log(deviceTableData.map((v) => v.selfLearn));
  const columns: ReadonlyArray<Column<DeviceItem>> = [
    {
      Header: '设备名称',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ row }: Cell<DeviceItem>) {
        // useMemo(() => {
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
        // }, [value]);
      },
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
      // Cell({ value }: { value: number }) {
      //   return value ? formatDateTimeByTimestamp({ timestamp: value }) : '';
      // },
    },
  ];
  return (
    <Flex flexDirection="column" height="100%">
      <Table
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        columns={columns}
        data={deviceTableData}
        scroll={{ y: '100%' }}
      />
    </Flex>
  );
}
export default DeviceListTable;
