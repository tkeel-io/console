import { HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell, Column } from 'react-table';

import {
  DeviceStatusIcon,
  IconWrapper,
  SelfLearnIcon,
} from '@tkeel/console-business-components';
import {
  LinkButton,
  MoreAction,
  Table,
  Tooltip,
} from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  BranchTowToneIcon,
  DotLineFilledIcon,
  MessageWarningTwoToneIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';
import { UsePaginationReturnType } from '@tkeel/console-types';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import AddSubscribeButton from '@/tkeel-console-plugin-tenant-devices/components/AddSubscribeButton';
import DeleteDevicesButton from '@/tkeel-console-plugin-tenant-devices/components/DeleteDevicesButton';
import UpdateDeviceButton from '@/tkeel-console-plugin-tenant-devices/components/UpdateDeviceButton';
import {
  DeviceApiItem,
  DeviceItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';
import { TreeNodeType } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import { SUBSCRIBES } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';
import handleSubscribeAddr from '@/tkeel-console-plugin-tenant-devices/utils';

interface Props {
  groupTree: TreeNodeType;
  pagination: UsePaginationReturnType;
  deviceList: DeviceApiItem[];
  isLoading: boolean;
  refetch?: () => void;
}

function DeviceListTable({
  groupTree,
  deviceList,
  pagination,
  isLoading,
  refetch,
}: Props): JSX.Element {
  const navigate = useNavigate();

  // const { nodeInfo } = groupItem;
  const COLORS = {
    DIR_CONNECT: {
      BG: [useColor('red.100'), useColor('violet.100')],
    },
    SUBSCRIBE: {
      BG: [useColor('gray.100'), useColor('teal.50')],
      ICON: [useColor(SUBSCRIBES[0].color), useColor(SUBSCRIBES[1].color)],
      ICON_TWO: [
        useColor(SUBSCRIBES[0].twoToneColor),
        useColor(SUBSCRIBES[1].twoToneColor),
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
    // eslint-disable-next-line no-underscore-dangle
    const subscribeAddr = sysField?._subscribeAddr ?? '';
    // eslint-disable-next-line no-underscore-dangle
    const isOnline = connectInfo?._online ?? false;
    return (
      <HStack>
        <DeviceStatusIcon isOnline={isOnline} />
        <Tooltip label={subscribeAddr ? '已订阅' : '未订阅'}>
          <IconWrapper bg={COLORS.SUBSCRIBE.BG[subscribeAddr ? 1 : 0]}>
            <MessageWarningTwoToneIcon
              size="20px"
              color={COLORS.SUBSCRIBE.ICON[subscribeAddr ? 1 : 0]}
              twoToneColor={COLORS.SUBSCRIBE.ICON_TWO[subscribeAddr ? 1 : 0]}
            />
          </IconWrapper>
        </Tooltip>
        <SelfLearnIcon isSelfLearn={selfLearn} />
      </HStack>
    );
  }

  const deviceTableData = deviceList.map((item: DeviceApiItem) => {
    const id = item?.id ?? '';
    const name = item?.properties?.basicInfo?.name ?? '';
    const templateId = item?.properties?.basicInfo?.templateId ?? '';
    const templateName = item?.properties?.basicInfo?.templateName ?? '';
    const selfLearn = item?.properties?.basicInfo?.selfLearn ?? false;
    const directConnection =
      item?.properties?.basicInfo?.directConnection ?? false;
    // eslint-disable-next-line no-underscore-dangle
    const createTime = item?.properties?.sysField?._createdAt ?? '';
    // eslint-disable-next-line no-underscore-dangle
    const status = item?.properties?.sysField?._status ?? '';

    return {
      id,
      name,
      directConnection,
      templateId,
      templateName,
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
                navigate(`/detail?id=${id}&menu-collapsed=true`);
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
            <Tooltip label={value ? '直连' : '非直连'}>
              <IconWrapper bg={COLORS.DIR_CONNECT.BG[value ? 1 : 0]}>
                {value ? (
                  <DotLineFilledIcon size="20px" />
                ) : (
                  <BranchTowToneIcon size="20px" />
                )}
              </IconWrapper>
            </Tooltip>
          );
        }, [value]),
    },
    {
      Header: '设备模板',
      accessor: 'templateName',
      Cell: ({ value }: { value: string }) =>
        useMemo(() => <Text color="gray.700">{value || '-'}</Text>, [value]),
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
            <Text minWidth="180px" fontSize="12px" color="gray.700">
              {value ? formatDateTimeByTimestamp({ timestamp: value }) : ''}
            </Text>
          ),
          [value]
        ),
    },
    {
      Header: '操作',
      width: 80,
      Cell: ({ row }: Cell<DeviceItem>) =>
        useMemo(() => {
          const originData = row.original.originData as DeviceApiItem;
          const id = originData?.id ?? '';
          const name = originData?.properties?.basicInfo?.name ?? '';
          const ext = originData?.properties?.basicInfo?.ext ?? {};
          const selfLearn =
            originData?.properties?.basicInfo?.selfLearn ?? false;
          const parentId = originData?.properties?.basicInfo?.parentId ?? '';
          const directConnection =
            originData?.properties?.basicInfo?.directConnection ?? false;
          const templateId =
            originData?.properties?.basicInfo?.templateId ?? '';
          const templateName =
            originData?.properties?.basicInfo?.templateName ?? '';
          const description =
            originData?.properties?.basicInfo?.description ?? '';
          const defaultFormValues = {
            id,
            selfLearn,
            description,
            templateId,
            templateName,
            directConnection,
            name,
            ext,
            parentId,
          };
          const subscribeAddr =
            // eslint-disable-next-line no-underscore-dangle
            originData.properties?.sysField?._subscribeAddr ?? '';
          const addrList = handleSubscribeAddr(subscribeAddr);
          return (
            <MoreAction
              buttons={[
                <AddSubscribeButton
                  key="subscribe"
                  addrList={addrList}
                  deviceId={id}
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
      styles={{
        wrapper: { flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' },
      }}
    />
  );
}
export default DeviceListTable;
