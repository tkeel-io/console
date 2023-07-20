import { Flex, HStack, Text, useClipboard } from '@chakra-ui/react';
import { values } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { CellProps, Column } from 'react-table';

import { MoreAction, Table } from '@tkeel/console-components';
import {
  ChainFilledIcon,
  DuotoneTwoToneIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import {
  AttributeRelationItem,
  ExpressionItem,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/types';

import AddRelationButton from '../AddRelationButton';
import DeleteRelationButton from '../DeleteRelationButton';
import UpdateRelationButton from '../UpdateRelationButton';

function getNameByDescription({
  description,
  expression,
}: {
  description: string;
  expression: string;
}) {
  if (description) {
    const [device, attribute] = description.split(',');
    const [deviceId, deviceName] = (device && device.split('=')) || [];
    const [attributeId, attributeName] =
      (attribute && attribute.split('=')) || [];
    const defaultAttributeId =
      (expression && expression.split('attributes.')[1]) || '';
    return {
      deviceId,
      deviceName,
      attributeId: attributeId || defaultAttributeId,
      attributeName,
    };
  }
  return { deviceId: '', deviceName: '', attributeId: '', attributeName: '' };
}

interface Props {
  deviceObject: DeviceObject;
  attributeRelationList: ExpressionItem[];
  refetch?: () => void;
  keywords?: string;
}
export default function AttributeRelationTable({
  deviceObject,
  attributeRelationList,
  refetch = () => {},
  keywords = '',
}: Props) {
  const { configs, id: uid } = deviceObject;
  const [copiedValue, setCopiedValue] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const attributeFields = configs?.attributes?.define?.fields ?? {};
  const { onCopy, hasCopied } = useClipboard(copiedValue, 200);
  const tableData = values(attributeFields)
    .filter((v) => v.id.includes(keywords) || v.name.includes(keywords))
    .map((item) => {
      const { id, name } = item;
      const relationItem = attributeRelationList.find(
        (v) => v.path === `attributes.${id}`
      );
      const expression = relationItem?.expression ?? '';
      const description = relationItem?.description ?? '';
      const { deviceId, deviceName, attributeId, attributeName } =
        getNameByDescription({ description, expression });
      return {
        id,
        name,
        deviceName,
        deviceId,
        attributeName,
        attributeId,
        icon: !!relationItem,
      };
    });
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

  const OperateCell = useCallback(
    ({ row }: CellProps<AttributeRelationItem>) => {
      const { original } = row;
      if (!original.deviceId) {
        return null;
      }
      return (
        <MoreAction
          buttons={[
            <UpdateRelationButton
              type="attributes"
              key="update"
              uid={uid}
              // deviceObject={deviceObject}
              configInfo={original}
              refetch={refetch}
            />,
            <DeleteRelationButton
              type="attributes"
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
    [uid]
  );
  const columns: ReadonlyArray<Column<AttributeRelationItem>> = [
    {
      Header: '属性名称',
      accessor: 'name',
      width: 160,
      Cell: useCallback(
        ({ value }: CellProps<AttributeRelationItem, string>) => (
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
      Header: '属性ID',
      accessor: 'id',
      width: 100,
    },
    {
      Header: '',
      width: 60,
      accessor: 'icon',
      Cell: useCallback(
        ({ value }: CellProps<AttributeRelationItem, boolean>) => {
          if (value) {
            return <ChainFilledIcon size="16px" />;
          }
          return null;
        },
        []
      ),
    },
    {
      Header: '关联设备',
      accessor: 'deviceName',
      width: 120,
      Cell: useCallback(
        ({ row }: CellProps<AttributeRelationItem>) => {
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
              type="attributes"
              uid={uid}
              configInfo={original}
              refetch={refetch}
            />
          );
        },
        [uid, refetch]
      ),
    },
    {
      Header: '关联设备ID',
      // accessor: 'deviceId',
      width: 100,
      Cell: useCallback(
        ({ row }: CellProps<AttributeRelationItem>) => {
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
      Header: '关联属性名称',
      accessor: 'attributeName',
      width: 120,
      Cell: useCallback(
        ({ value }: CellProps<AttributeRelationItem, string | undefined>) =>
          value ? (
            <HStack spacing="6px">
              <DuotoneTwoToneIcon size="16px" />
              <Text>{value}</Text>
            </HStack>
          ) : null,
        []
      ),
    },
    {
      Header: '关联属性ID',
      // accessor: 'attributeId',
      width: 100,
      Cell: useCallback(
        ({ row }: CellProps<AttributeRelationItem>) => {
          const { original, id } = row;
          const value = original.attributeId ?? '';
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
      hasKeywords={!!keywords}
    />
  );
}
