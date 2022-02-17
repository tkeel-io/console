/* eslint-disable no-console */
// import { useMemo } from 'react';
import { Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  // PageHeaderToolbar,
  Table,
  // toast,
} from '@tkeel/console-components';

// import { usePagination } from '@tkeel/console-hooks';
import useDeviceListQuery, {
  DeviceItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';

const deviceList = [
  {
    name: '协议设备',
    directConnection: true,
    templateId: '传感器标准模版',
    status: { isAlive: true, isSubscribe: true, selfLearn: true },
  },
];

function DeviceListTable(): JSX.Element {
  const params = {
    page_num: 0,
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
  const { listDeviceObject } = useDeviceListQuery({ params });
  console.log(listDeviceObject);
  const columns: ReadonlyArray<Column<DeviceItem>> = [
    {
      Header: '设备名称',
      accessor: 'name',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ value }: { value: string }) {
        // useMemo(() => {
        return (
          <Text color="primary" fontWeight="600">
            {value}
          </Text>
        );
        // }, [value]);
      },
    },
    {
      Header: '连接方式',
      accessor: 'directConnection',
      Cell({ value }) {
        return value ? '直连' : '非直连';
      },
    },
    {
      Header: '设备模版',
      accessor: 'templateId',
    },
  ];
  return (
    <Flex flexDirection="column" height="100%">
      <Table
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        columns={columns}
        data={deviceList}
        scroll={{ y: '100%' }}
      />
    </Flex>
  );
}
export default DeviceListTable;
