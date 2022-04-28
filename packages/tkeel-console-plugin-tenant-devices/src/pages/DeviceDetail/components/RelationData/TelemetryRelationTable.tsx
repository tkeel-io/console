import { Flex, HStack, Text, useClipboard } from '@chakra-ui/react';
import { values } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Cell, Column } from 'react-table';

import { MoreAction, Table } from '@tkeel/console-components';
import {
  ChainFilledIcon,
  DuotoneTwoToneIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import {
  ExpressionItem,
  TelemetryRelationItem,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/types';

import AddRelationButton from '../AddRelationButton';
import DeleteRelationButton from '../DeleteRelationButton';
import UpdateRelationButton from '../UpdateRelationButton';

function getNameByDescription({ description }: { description: string }) {
  if (description) {
    const [device, telemetry] = description.split(',');
    const [deviceId, deviceName] = device.split('=');
    const [telemetryId, telemetryName] = telemetry.split('=');
    return {
      deviceId,
      deviceName,
      telemetryId,
      telemetryName,
    };
  }
  return { deviceId: '', deviceName: '', telemetryId: '', telemetryName: '' };
}

interface Props {
  deviceObject: DeviceObject;
  telemetryRelationList: ExpressionItem[];
  refetch?: () => void;
  keywords?: string;
}
export default function TelemetryRelationTable({
  deviceObject,
  telemetryRelationList,
  refetch = () => {},
  keywords = '',
}: Props) {
  const { configs, id: uid } = deviceObject;
  const telemetryFields = configs?.telemetry?.define?.fields ?? {};
  const [copiedValue, setCopiedValue] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const { onCopy, hasCopied } = useClipboard(copiedValue, 200);
  const tableData = values(telemetryFields)
    .filter((v) => v.id.includes(keywords) || v.name.includes(keywords))
    .map((item) => {
      const { id, name } = item;
      const relationItem = telemetryRelationList.find(
        (v) => v.path === `telemetry.${id}`
      );
      // const expression = relationItem?.expression ?? '';
      const description = relationItem?.description ?? '';
      const { deviceId, deviceName, telemetryId, telemetryName } =
        getNameByDescription({ description });
      return {
        id,
        name,
        deviceName,
        deviceId,
        telemetryName,
        telemetryId,
        icon: !!relationItem,
      };
    });
  const OperateCell = useCallback(
    ({ row }: Cell<TelemetryRelationItem>) => {
      const { original } = row;
      if (!original.deviceId) {
        return '';
      }
      return (
        <MoreAction
          buttons={[
            <UpdateRelationButton
              type="telemetry"
              key="update"
              uid={uid}
              configInfo={original}
              deviceObject={deviceObject}
              refetch={refetch}
            />,
            <DeleteRelationButton
              type="telemetry"
              key="delete"
              uid={uid}
              path={original?.id}
              refetch={refetch}
            />,
          ]}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refetch, uid]
  );
  useEffect(() => {
    if (copiedValue) {
      onCopy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copiedValue]);

  const handleCopy = useCallback(
    ({ value, id }: { value: string; id: string }) => {
      setCopiedValue(value);
      setCopiedId(id);
    },
    []
  );
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
      Header: '',
      width: 60,
      accessor: 'icon',
      Cell: useCallback(({ value }) => {
        if (value) {
          return <ChainFilledIcon size="16px" />;
        }
        return '';
      }, []),
    },
    {
      Header: '关联设备',
      // accessor: 'deviceName',
      width: 120,
      Cell: useCallback(
        ({ row }: Cell<TelemetryRelationItem>) => {
          const { original } = row;
          const { deviceName } = original;
          if (deviceName) {
            return (
              <HStack spacing="6px">
                <SmartObjectTwoToneIcon size="16px" />
                <Text>{deviceName}</Text>
              </HStack>
            );
          }
          return (
            <AddRelationButton
              type="telemetry"
              deviceObject={deviceObject}
              configInfo={original}
              refetch={refetch}
            />
          );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [deviceObject]
      ),
    },
    {
      Header: '关联设备ID',
      // accessor: 'deviceId',
      width: 100,
      Cell: useCallback(
        ({ row }: Cell<TelemetryRelationItem>) => {
          const { original, id } = row;
          const value = original.deviceId ?? '';
          if (hasCopied && id === copiedId && value === copiedValue) {
            return <Text color="primary">已复制</Text>;
          }
          return (
            <Text
              cursor="copy"
              w="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              onClick={() => {
                handleCopy({ value, id });
              }}
            >
              {value}
            </Text>
          );
        },
        [copiedId, copiedValue, handleCopy, hasCopied]
      ),
    },
    {
      Header: '关联遥测名称',
      accessor: 'telemetryName',
      width: 120,
      Cell: useCallback(
        ({ value }) =>
          value ? (
            <HStack spacing="6px">
              <DuotoneTwoToneIcon size="16px" />
              <Text>{value}</Text>
            </HStack>
          ) : (
            ''
          ),
        []
      ),
    },
    {
      Header: '关联遥测ID',
      // accessor: 'telemetryId',
      width: 100,
      Cell: useCallback(
        ({ row }: Cell<TelemetryRelationItem>) => {
          const { original, id } = row;
          const value = original.telemetryId ?? '';
          if (hasCopied && id === copiedId && value === copiedValue) {
            return <Text color="primary">已复制</Text>;
          }
          return (
            <Text
              cursor="copy"
              w="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              onClick={() => {
                handleCopy({ value, id });
              }}
            >
              {value}
            </Text>
          );
        },
        [copiedId, copiedValue, handleCopy, hasCopied]
      ),
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
