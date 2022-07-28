import {
  Box,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { CellProps, Column } from 'react-table';

import { DeviceStatusIcon } from '@tkeel/console-business-components';
import {
  Empty,
  MoreAction,
  NavigateToDeviceTemplateDetailInOtherPlugins,
  PageHeaderToolbar,
  SearchEmpty,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  CodeFilledIcon,
  DnsAliasesTowToneIcon,
  ProtocolHttpFilledIcon,
  ProtocolSshFilledIcon,
  SmartObjectTwoToneIcon,
  SuccessFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useNetworkListQuery from '@/tkeel-console-plugin-tenant-networks/hooks/queries/useNetworkListQuery';

import CreateProxyButton from '../CreateProxyButton';
import DeleteButton from '../DeleteButton';
import SwitchProxyButton from '../SwitchProxyButton';

interface ProxyListItemData {
  id: string;
  name: string;
  port: string;
  status: 'enabled' | 'disabled';
  online: string;
  token: string;
  protocol: string;
  remark: string;
  device_name: string;
  device_id: string;
  url: string;
  host: string;
}

interface Variable {
  name: string;
  icon: ReactNode;
}

interface Props {
  id: string;
}

export default function Index({ id }: Props) {
  const boxShadow =
    '0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)';
  const [keywords, setKeyWords] = useState('');
  const toast = plugin.getPortalToast();
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const { proxyList, data, isSuccess, isLoading, refetch } =
    useNetworkListQuery({
      id,
      pageNum,
      pageSize,
      query: keywords,
    });
  const totalNum = data?.total ?? 0;
  if (isSuccess) {
    setTotalSize(totalNum);
  }

  const handleCreateProxySuccess = useCallback(
    (e: string) => {
      toast(e === 'edit' ? '修改成功' : '创建成功', {
        status: 'success',
      });
      refetch();
    },
    [toast, refetch]
  );

  const agreeFn = (color: string) => {
    return {
      HTTP: {
        name: 'HTTP',
        icon: <ProtocolHttpFilledIcon color={color} />,
      },
      HTTPS: {
        name: 'HTTPS',
        icon: <ProtocolHttpFilledIcon color={color} />,
      },
      TCP: {
        name: 'TCP',
        icon: <CodeFilledIcon color={color} />,
      },
      SSH: {
        name: 'SSH',
        icon: <ProtocolSshFilledIcon color={color} />,
      },
    };
  };

  const statusVariable = {
    enabled: {
      name: '已启用',
      icon: <SuccessFilledIcon color="green.300" size={14} />,
    },
    disabled: {
      name: '已禁用',
      icon: <WarningFilledIcon color="gray.500" size={14} />,
    },
  };

  const columns: ReadonlyArray<Column<ProxyListItemData>> = [
    {
      Header: '代理服务名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <DnsAliasesTowToneIcon size={20} />
              <Text color="gray.800" fontWeight="600" marginLeft="8px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '状态',
      accessor: 'status',
      width: 100,
      Cell: ({ value }: { value: string }) => {
        const { name, icon } = statusVariable[value] as Variable;
        return useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              {icon}
              <Text color="gray.800" ml="2px">
                {name}
              </Text>
            </Flex>
          ),
          [name, icon]
        );
      },
    },
    {
      Header: '连接',
      accessor: 'online',
      width: 80,
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => <DeviceStatusIcon isOnline={value === 'online'} size={16} />,
          [value]
        ),
    },
    {
      Header: 'IP地址：端口',
      accessor: 'port',
      Cell: ({ row }: CellProps<ProxyListItemData>) => {
        const { original } = row;
        const { host, port } = original;
        return useMemo(
          () => (
            <Box color="gray.700">
              {host}:{port}
            </Box>
          ),
          [host, port]
        );
      },
    },
    {
      Header: '协议类型',
      accessor: 'protocol',
      width: 100,
    },
    {
      Header: 'URL',
      accessor: 'url',
      width: 50,
      Cell: ({ row }: CellProps<ProxyListItemData>) => {
        const { original } = row;
        const { protocol, url, online } = original;
        const protocolArr = ['HTTP'];
        let protocolIcon: ReactNode = '';
        if (protocolArr.includes(protocol)) {
          const { icon } = agreeFn(
            online === 'online' ? 'grayAlternatives.300' : 'gray.400'
          )[protocol] as Variable;
          protocolIcon = icon;
        }
        return useMemo(
          () => (
            <Box>
              {online === 'online' ? (
                <Popover placement="top">
                  <PopoverTrigger>
                    <Box cursor="pointer">{protocolIcon}</Box>
                  </PopoverTrigger>
                  <PopoverContent
                    bgColor="white"
                    color="gray.700"
                    lineHeight="24px"
                    fontSize="12px"
                    p="8px 12px"
                    borderRadius="4px"
                    border="none"
                    boxShadow={boxShadow}
                    _focus={{
                      boxShadow,
                    }}
                  >
                    <PopoverArrow border="none" boxShadow={boxShadow} />
                    <PopoverBody
                      cursor="pointer"
                      textDecoration="underline"
                      onClick={() => {
                        const w = window.open('about:blank') as Window;
                        w.location.href = url;
                      }}
                    >
                      {url}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <Box cursor="not-allowed">{protocolIcon}</Box>
              )}
            </Box>
          ),
          [protocolIcon, url, online]
        );
      },
    },
    {
      Header: '关联设备',
      accessor: 'device_name',
      Cell: ({ row }: CellProps<ProxyListItemData>) => {
        const { original } = row;
        return useMemo(
          () => (
            <Box>
              {original?.device_name && (
                <NavigateToDeviceTemplateDetailInOtherPlugins
                  id={original?.device_id}
                >
                  <HStack>
                    <SmartObjectTwoToneIcon size="16px" />
                    <Text ml="8px">{original?.device_name}</Text>
                  </HStack>
                </NavigateToDeviceTemplateDetailInOtherPlugins>
              )}
            </Box>
          ),
          [original]
        );
      },
    },
    {
      Header: '备注',
      accessor: 'remark',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Tooltip
              label={value || '—'}
              hasArrow
              placement="top"
              bgColor="white"
              color="gray.700"
              lineHeight="24px"
              fontSize="12px"
              p="8px 12px"
              borderRadius="4px"
              boxShadow={boxShadow}
            >
              <Text
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                maxWidth="118px"
              >
                {value || '-'}
              </Text>
            </Tooltip>
          ),
          [value]
        ),
    },
    {
      Header: '操作',
      width: 80,
      Cell: useCallback(
        ({ row }: CellProps<ProxyListItemData>) => {
          const { original } = row;
          const proxyCruxData = {
            proxyId: original?.id,
            proxyName: original?.name,
            proxyIp: original?.host,
            proxyPort: original?.port,
            proxyAgree: original?.protocol,
            proxyRemark: original?.remark,
            proxyDeviceId: original?.device_id,
            proxyDeviceName: original?.device_name,
          };
          return (
            <MoreAction
              styles={{ actionList: { width: '124px' } }}
              buttons={[
                <SwitchProxyButton
                  key="switch"
                  clientId={id}
                  cruxData={original}
                  refetch={() => refetch()}
                />,
                <CreateProxyButton
                  key="edit"
                  type="editButton"
                  clientId={id}
                  proxyCruxData={proxyCruxData}
                  onSuccess={() => handleCreateProxySuccess('edit')}
                />,
                <DeleteButton
                  key="delete"
                  cruxData={{ id: original?.id, name: original?.name }}
                  refetch={() => refetch()}
                />,
              ]}
            />
          );
        },
        [id, refetch, handleCreateProxySuccess]
      ),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%" margin="0 20px">
      <PageHeaderToolbar
        name="代理服务列表"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateProxyButton
            key="create"
            type="createButton"
            clientId={id}
            onSuccess={() => handleCreateProxySuccess('create')}
          />,
        ]}
        styles={{ title: { fontSize: '14px' } }}
      />
      <Table
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'whiteAlias',
          },
          body: {
            flex: 1,
          },
        }}
        scroll={{ y: '100%' }}
        columns={columns}
        data={proxyList}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        empty={
          keywords ? (
            <SearchEmpty
              title="没有符合条件的代理服务"
              styles={{
                wrapper: { height: '100%' },
                image: { width: '80px' },
                text: { color: 'gray.500', fontSize: '14px' },
              }}
            />
          ) : (
            <Empty
              type="component"
              title={
                <Text fontSize="14px" lineHeight="24px" color="gray.700">
                  请
                  <CreateProxyButton
                    key="create"
                    type="createText"
                    clientId={id}
                    onSuccess={() => handleCreateProxySuccess('create')}
                  />
                  代理服务
                </Text>
              }
              styles={{
                wrapper: { width: '100%', height: '100%' },
              }}
            />
          )
        }
      />
    </Flex>
  );
}
