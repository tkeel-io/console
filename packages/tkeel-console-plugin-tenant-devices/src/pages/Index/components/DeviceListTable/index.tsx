/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import { ReactNode, useMemo } from 'react';
import { Cell, Column } from 'react-table';
import { Box, Flex, HStack, Link, Text, Tooltip } from '@chakra-ui/react';
import { MoreAction, Table } from '@tkeel/console-components';
import { useColor, usePagination } from '@tkeel/console-hooks';
import {
  BranchTowToneIcon,
  DotLineFilledIcon,
  MessageWarningTwoToneIcon,
  VpcTwoToneIcon,
  WebcamTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import DeleteDevicesButton from '@/tkeel-console-plugin-tenant-devices/components/DeleteDevicesButton';
import EditDeviceButton from '@/tkeel-console-plugin-tenant-devices/components/EditDeviceButton';
import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import { DEVICE_STATUS } from '@/tkeel-console-plugin-tenant-devices/constants';
import useDeviceListQuery, {
  DeviceApiItem,
  DeviceItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';
import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import {
  SELF_LEARN_COLORS,
  SUBSCRIBES,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

interface Props {
  groupItem: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
}

function TooltipIcon({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}): JSX.Element {
  return (
    <Tooltip
      label={label}
      hasArrow
      bgColor="white"
      color="gray.700"
      lineHeight="24px"
      fontSize="12px"
      p="4px 8px"
    >
      <Box> {children}</Box>
    </Tooltip>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DeviceStatus({
  originData,
}: {
  originData: DeviceApiItem;
}): JSX.Element {
  const { basicInfo, sysField } = originData?.properties ?? {};
  const selfLearn = basicInfo?.selfLearn ?? false;
  const subscribeAddr = sysField?._subscribeAddr ?? '';
  const isOnline = sysField?._status === DEVICE_STATUS.ONLINE;
  return (
    <HStack>
      <TooltipIcon
        label={
          <Flex>
            设备
            {isOnline ? (
              <Text color="green.50">在线</Text>
            ) : (
              <Text color="gray.500">离线</Text>
            )}
          </Flex>
        }
      >
        <IconWrapper iconBg={useColor(isOnline ? 'green.50' : 'gray.100')}>
          {isOnline ? (
            <WifiFilledIcon color="green.300" />
          ) : (
            <WifiOffFilledIcon color="gray.500" />
          )}
        </IconWrapper>
      </TooltipIcon>

      <TooltipIcon label={subscribeAddr ? '已订阅' : '未订阅'}>
        <IconWrapper iconBg={useColor(subscribeAddr ? 'teal.50' : 'gray.100')}>
          <MessageWarningTwoToneIcon
            color={useColor(SUBSCRIBES[subscribeAddr ? 1 : 0].color)}
            twoToneColor={useColor(
              SUBSCRIBES[subscribeAddr ? 1 : 0].twoToneColor
            )}
          />
        </IconWrapper>
      </TooltipIcon>

      <TooltipIcon label={selfLearn ? '自学习' : '未开启自学习'}>
        <IconWrapper iconBg={useColor(selfLearn ? 'blue.50' : 'gray.100')}>
          <VpcTwoToneIcon
            color={useColor(SELF_LEARN_COLORS[selfLearn ? 1 : 0].color)}
            twoToneColor={useColor(
              SELF_LEARN_COLORS[selfLearn ? 1 : 0].twoToneColor
            )}
          />
        </IconWrapper>
      </TooltipIcon>
    </HStack>
  );
}

function DeviceListTable({ groupItem }: Props): JSX.Element {
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const { nodeInfo } = groupItem;
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
  const { refetch, deviceList, isLoading } = useDeviceListQuery({
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
              <HStack>
                <WebcamTwoToneIcon size="24px" />
                <Text fontSize="12px">{original.name}</Text>
              </HStack>
            </Link>
          );
        }, [row]),
    },
    {
      Header: '连接方式',
      accessor: 'directConnection',
      Cell: ({ value }: { value: boolean }) =>
        useMemo(() => {
          return (
            <TooltipIcon label={value ? '直连' : '非直连'}>
              <Box>{value ? <DotLineFilledIcon /> : <BranchTowToneIcon />}</Box>
            </TooltipIcon>
          );
        }, [value]),
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
      Cell: ({ row }: Cell<DeviceItem>) =>
        useMemo(() => {
          const originData = row.original?.originData as DeviceApiItem;
          // return <Box pos="relative">{renderDeviceStatus({ original })}</Box>;
          return <DeviceStatus originData={originData} />;
        }, [row]),
    },
    {
      Header: '创建时间',
      accessor: 'createTime',
      Cell: ({ value }: { value: number }) =>
        useMemo(
          () => (
            <Text minWidth="180px" fontSize="12px" color="gray.600">
              {value ? formatDateTimeByTimestamp({ timestamp: value }) : ''}
            </Text>
          ),
          [value]
        ),
    },
    {
      Header: '操作',
      Cell: ({ row }: Cell<DeviceItem>) =>
        useMemo(() => {
          const originData = row.original?.originData as DeviceApiItem;
          const { id } = originData;
          const deviceName = originData?.properties?.basicInfo?.name;
          return (
            <MoreAction
              buttons={[
                <EditDeviceButton
                  key="edit"
                  deviceInfo={originData}
                  refetch={refetch}
                />,
                <DeleteDevicesButton
                  ids={[id]}
                  key="delete"
                  deviceName={deviceName}
                  refetch={refetch}
                />,
              ]}
            />
          );
        }, [row]),
    },
  ];
  return (
    <Table
      columns={columns}
      data={deviceTableData}
      scroll={{ y: '100%' }}
      paginationProps={pagination}
      isLoading={isLoading}
      style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
    />
  );
}
export default DeviceListTable;
