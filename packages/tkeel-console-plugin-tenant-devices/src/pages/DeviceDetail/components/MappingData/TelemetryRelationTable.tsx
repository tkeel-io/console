import { Button, Flex, Text } from '@chakra-ui/react';
import { values } from 'lodash';
import { useCallback } from 'react';
import { Cell, Column } from 'react-table';

import { MoreAction, Table } from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import AddRelationButton from '../AddRelationButton';

type TelemetryRelationItem = {
  name: string;
  id: string;
  deviceName?: string;
  deviceId?: string;
  telemetryName?: string;
  telemetryId?: string;
};

interface Props {
  deviceObject: DeviceObject;
}
export default function TelemetryRelationTable({ deviceObject }: Props) {
  const { configs, id: uid } = deviceObject;
  const telemetryFields = configs?.telemetry?.define?.fields ?? {};
  const tableData = values(telemetryFields).map((item) => {
    const { id, name } = item;
    return {
      id,
      name,
      deviceName: '',
      deviceId: '',
      telemetryName: '',
      telemetryId: '',
    };
  });
  const OperateCell = useCallback(({ row }: Cell<TelemetryRelationItem>) => {
    const { original } = row;
    // eslint-disable-next-line no-console
    console.log(original);
    return <MoreAction buttons={[<Button key="edit">编辑</Button>]} />;
  }, []);
  const columns: ReadonlyArray<Column<TelemetryRelationItem>> = [
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
      accessor: 'id',
      width: 100,
    },
    {
      Header: '关联设备',
      accessor: 'deviceName',
      width: 120,
      Cell: useCallback(() => <AddRelationButton uid={uid} />, [uid]),
    },
    {
      Header: '关联设备ID',
      accessor: 'deviceId',
      width: 100,
    },
    {
      Header: '关联遥测名称',
      accessor: 'telemetryName',
      width: 120,
    },
    {
      Header: '关联遥测ID',
      accessor: 'telemetryId',
      width: 100,
    },
    {
      Header: '操作',
      width: 80,
      Cell: OperateCell,
    },
  ];
  return (
    <Table
      scroll={{ y: '100%' }}
      styles={{
        wrapper: {
          flex: 1,
          height: '100%',
          overflow: 'hidden',
          padding: '6px 12px 12px',
        },
        bodyTr: {
          borderRadius: '4px',
          fontSize: '12px',
          background: 'white',
          marginBottom: '4px',
          borderWidth: '1px',
          borderStyle: 'solid',
        },
        bodyTd: { height: '42px' },
        headTr: {
          borderBottom: 'none',
        },
      }}
      columns={columns}
      data={tableData}
      hasPagination={false}
    />
  );
}
