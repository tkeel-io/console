/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
import { Box, Flex, HStack, Text, Tooltip } from '@chakra-ui/react';
import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Column } from 'react-table';

import { LinkButton, MoreAction, Table } from '@tkeel/console-components';
import { useColor, usePagination } from '@tkeel/console-hooks';
import {
  BranchTowToneIcon,
  DotLineFilledIcon,
  MessageWarningTwoToneIcon,
  SmartObjectTwoToneIcon,
  VpcTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import AddSubscribeButton from '@/tkeel-console-plugin-tenant-devices/components/AddSubscribeButton';
import DeleteDevicesButton from '@/tkeel-console-plugin-tenant-devices/components/DeleteDevicesButton';
import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import UpdateDeviceButton from '@/tkeel-console-plugin-tenant-devices/components/UpdateDeviceButton';
import useDeviceListQuery, {
  DeviceApiItem,
  DeviceItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';
import { TreeNodeType } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import {
  SELF_LEARN_COLORS,
  SUBSCRIBES,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

interface Props {
  groupId?: string;
  keyWords?: string;
  groupTree: TreeNodeType;
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

function DeviceListTable({
  groupId = '',
  keyWords,
  groupTree,
}: Props): JSX.Element {
  const navigate = useNavigate();
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  // const { nodeInfo } = groupItem;
  const COLORS = {
    DEVICE: {
      BG: [useColor('gray.100'), useColor('green.50')],
      ICON: [useColor('green.300'), useColor('gray.500')],
    },
    SUBSCRIBE: {
      BG: [useColor('gray.100'), useColor('teal.50')],
      ICON: [useColor(SUBSCRIBES[0].color), useColor(SUBSCRIBES[1].color)],
      ICON_TWO: [
        useColor(SUBSCRIBES[0].twoToneColor),
        useColor(SUBSCRIBES[1].twoToneColor),
      ],
    },
    SELF_LEARN: {
      BG: [useColor('gray.100'), useColor('blue.50')],
      ICON: [
        useColor(SELF_LEARN_COLORS[0].color),
        useColor(SELF_LEARN_COLORS[1].color),
      ],
      ICON_TWO: [
        useColor(SELF_LEARN_COLORS[0].twoToneColor),
        useColor(SELF_LEARN_COLORS[1].twoToneColor),
      ],
    },
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  function DeviceStatus({
    originData,
  }: {
    originData: DeviceApiItem;
  }): JSX.Element {
    const { basicInfo, sysField, connectInfo } = originData?.properties ?? {};
    const selfLearn = basicInfo?.selfLearn ?? false;
    const subscribeAddr = sysField?._subscribeAddr ?? '';
    const isOnline = connectInfo?._online ?? false;
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
          <IconWrapper iconBg={COLORS.DEVICE.BG[isOnline ? 1 : 0]}>
            {isOnline ? (
              <WifiFilledIcon color="green.300" />
            ) : (
              <WifiOffFilledIcon color="gray.500" />
            )}
          </IconWrapper>
        </TooltipIcon>

        <TooltipIcon label={subscribeAddr ? '已订阅' : '未订阅'}>
          <IconWrapper iconBg={COLORS.SUBSCRIBE.BG[subscribeAddr ? 1 : 0]}>
            <MessageWarningTwoToneIcon
              color={COLORS.SUBSCRIBE.ICON[subscribeAddr ? 1 : 0]}
              twoToneColor={COLORS.SUBSCRIBE.ICON_TWO[subscribeAddr ? 1 : 0]}
            />
          </IconWrapper>
        </TooltipIcon>

        <TooltipIcon label={selfLearn ? '自学习' : '未开启自学习'}>
          <IconWrapper iconBg={COLORS.SELF_LEARN.BG[selfLearn ? 1 : 0]}>
            <VpcTwoToneIcon
              color={COLORS.SELF_LEARN.ICON[selfLearn ? 1 : 0]}
              twoToneColor={COLORS.SELF_LEARN.ICON_TWO[selfLearn ? 1 : 0]}
            />
          </IconWrapper>
        </TooltipIcon>
      </HStack>
    );
  }
  const params = {
    query: keyWords || '',
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'name',
    is_descending: false,
    condition: [
      {
        field: 'sysField._spacePath',
        operator: '$wildcard',
        value: groupId,
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
            <LinkButton
              onClick={() => {
                navigate(`/detail?id=${id}`);
              }}
              color="gray.600"
              fontWeight="600"
              _hover={{ color: 'primary' }}
            >
              <HStack>
                <SmartObjectTwoToneIcon size="24px" />
                <Text fontSize="12px">{original.name}</Text>
              </HStack>
            </LinkButton>
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
              <IconWrapper iconBg={useColor(value ? 'violet.100' : 'red.100')}>
                {value ? <DotLineFilledIcon /> : <BranchTowToneIcon />}
              </IconWrapper>
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
          const { id, properties } = originData;
          const { basicInfo } = properties;
          const {
            name,
            description,
            directConnection,
            templateId,
            parentId,
            selfLearn,
            ext,
          } = basicInfo;
          const defaultFormValues = {
            id,
            selfLearn,
            description,
            templateId,
            directConnection,
            name,
            ext,
            parentId,
          };
          return (
            <MoreAction
              buttons={[
                <AddSubscribeButton
                  key="subscribe"
                  id={id}
                  refetch={refetch}
                />,
                <UpdateDeviceButton
                  key="edit"
                  defaultFormValues={defaultFormValues}
                  refetch={refetch}
                  groupTree={groupTree}
                />,
                <DeleteDevicesButton
                  ids={[id]}
                  key="delete"
                  deviceName={name}
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
