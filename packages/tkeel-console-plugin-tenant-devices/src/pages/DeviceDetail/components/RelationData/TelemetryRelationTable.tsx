import { Box, Flex, HStack, Text, useClipboard } from '@chakra-ui/react';
import { values } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CellProps, Column } from 'react-table';

import { MoreAction, Table, TooltipText } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  ChainFilledIcon,
  DuotoneTwoToneIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import { TELEMETRY_TABLE_PAGE_SIZE } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';
import {
  ExpressionItem,
  TelemetryRelationItem,
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
    const [device, telemetry] = description.split(',');
    const [deviceId, deviceName] = (device && device.split('=')) || [];
    const [telemetryId, telemetryName] =
      (telemetry && telemetry.split('=')) || [];
    const defaultTelemetryId =
      (expression && expression.split('telemetry.')[1]) || '';
    return {
      deviceId,
      deviceName,
      telemetryId: telemetryId || defaultTelemetryId,
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

  const [copiedValue, setCopiedValue] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const { onCopy, hasCopied } = useClipboard(copiedValue, 200);

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

  const renderName = ({ value }: CellProps<TelemetryRelationItem, string>) => (
    <Flex alignItems="center" justifyContent="space-between" overflow="hidden">
      <Box flexShrink={0}>
        <DuotoneTwoToneIcon />
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

  const renderId = ({ value }: CellProps<TelemetryRelationItem, string>) => (
    <TooltipText label={value} />
  );

  const renderIcon = ({ value }: CellProps<TelemetryRelationItem, boolean>) => {
    if (value) {
      return <ChainFilledIcon size="16px" />;
    }
    return null;
  };

  const renderDeviceName = useCallback(
    ({ row }: CellProps<TelemetryRelationItem>) => {
      const { original } = row;
      const { deviceName } = original;
      if (deviceName) {
        return (
          <HStack spacing="6px" overflow="hidden">
            <Box flexShrink={0}>
              <SmartObjectTwoToneIcon size="16px" />
            </Box>
            <TooltipText label={deviceName} />
          </HStack>
        );
      }
      return (
        <AddRelationButton
          type="telemetry"
          uid={uid}
          configInfo={original}
          refetch={refetch}
        />
      );
    },
    [uid, refetch]
  );

  const renderDeviceId = useCallback(
    ({ row }: CellProps<TelemetryRelationItem>) => {
      const { original, id } = row;
      const value = original.deviceId ?? '';
      if (hasCopied && id === copiedId && value === copiedValue) {
        return <Text color="primary">已复制</Text>;
      }
      return (
        <TooltipText
          label={value}
          cursor="copy"
          onClick={() => {
            handleCopy({ value, id });
          }}
        />
      );
    },
    [copiedId, copiedValue, handleCopy, hasCopied]
  );

  const renderTelemetryName = ({
    value,
  }: CellProps<TelemetryRelationItem, string | undefined>) =>
    value ? (
      <HStack spacing="6px" overflow="hidden">
        <Box flexShrink={0}>
          <DuotoneTwoToneIcon size="16px" />
        </Box>
        <TooltipText label={value} />
      </HStack>
    ) : null;

  const renderTelemetryId = useCallback(
    ({ row }: CellProps<TelemetryRelationItem>) => {
      const { original, id } = row;
      const value = original.telemetryId ?? '';
      if (hasCopied && id === copiedId && value === copiedValue) {
        return <Text color="primary">已复制</Text>;
      }
      return (
        <TooltipText
          label={value}
          cursor="copy"
          onClick={() => {
            handleCopy({ value, id });
          }}
        />
      );
    },
    [copiedId, copiedValue, handleCopy, hasCopied]
  );

  const renderActions = useCallback(
    ({ row }: CellProps<TelemetryRelationItem>) => {
      const { original } = row;
      if (!original.deviceId) {
        return null;
      }
      return (
        <MoreAction
          buttons={[
            <UpdateRelationButton
              type="telemetry"
              key="update"
              uid={uid}
              configInfo={original}
              // deviceObject={deviceObject}
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
    [refetch, uid]
  );

  const columns: ReadonlyArray<Column<TelemetryRelationItem>> = useMemo(
    () => [
      {
        Header: '遥测名称',
        accessor: 'name',
        width: 160,
        Cell: renderName,
      },
      {
        Header: '遥测ID',
        accessor: 'id',
        width: 100,
        Cell: renderId,
      },
      {
        Header: '',
        width: 60,
        accessor: 'icon',
        Cell: renderIcon,
      },
      {
        Header: '关联设备',
        // accessor: 'deviceName',
        width: 120,
        Cell: renderDeviceName,
      },
      {
        Header: '关联设备ID',
        // accessor: 'deviceId',
        width: 100,
        Cell: renderDeviceId,
      },
      {
        Header: '关联遥测名称',
        accessor: 'telemetryName',
        width: 120,
        Cell: renderTelemetryName,
      },
      {
        Header: '关联遥测ID',
        // accessor: 'telemetryId',
        width: 100,
        Cell: renderTelemetryId,
      },
      {
        Header: '操作',
        width: 80,
        Cell: renderActions,
      },
    ],
    [renderActions, renderDeviceId, renderDeviceName, renderTelemetryId]
  );

  const pagination = usePagination({ pageSize: TELEMETRY_TABLE_PAGE_SIZE });
  const { pageNum, pageSize, setTotalSize } = pagination;
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;

  const allData = useMemo(() => {
    const telemetryFields = configs?.telemetry?.define?.fields ?? {};
    const filtered = values(telemetryFields).filter(
      (v) => v.id.includes(keywords) || v.name.includes(keywords)
    );
    return filtered.map((item) => {
      const { id, name } = item;
      const relationItem = telemetryRelationList.find(
        (v) => v.path === `telemetry.${id}`
      );
      const expression = relationItem?.expression ?? '';
      const description = relationItem?.description ?? '';
      const { deviceId, deviceName, telemetryId, telemetryName } =
        getNameByDescription({ description, expression });
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
  }, [configs?.telemetry?.define?.fields, keywords, telemetryRelationList]);
  const data = useMemo(() => allData.slice(start, end), [allData, end, start]);

  useEffect(() => {
    setTotalSize(allData.length);
  }, [setTotalSize, allData.length]);

  return (
    <Table
      scroll={{ y: '100%' }}
      columns={columns}
      data={data}
      hasKeywords={!!keywords}
      paginationProps={{ ...pagination, showPageSizeSelector: false }}
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
    />
  );
}
