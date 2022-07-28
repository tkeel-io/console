import { Center, Flex, HStack, Text } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CellProps, Column } from 'react-table';

import { DeviceStatusIcon } from '@tkeel/console-business-components';
import {
  Loading,
  MoreAction,
  NavigateToDeviceDetailInOtherPlugins,
  NavigateToDeviceTemplateDetailInOtherPlugins,
  SearchInput,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  ReportFilledIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';

import { RouteType } from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';
import useRuleDevicesQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDevicesQuery';

import TitleWrapper from '../TitleWrapper';
import AddDevicesButton from './AddDevicesButton';
import DeleteDevicesButton from './DeleteDevicesButton';
import MoveRoutingRuleButton from './MoveRoutingRuleButton';
import RuleSQL from './RuleSQL';

type DeviceColumnData = {
  id: string;
  name: string;
  status: 'online' | 'offline';
  templateId: string;
  templateName: string;
  parentName: string;
};

type Props = {
  routeType: RouteType;
};

export default function DataSelect({ routeType }: Props) {
  const [showDeviceList, setShowDeviceList] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState<
    { id: string; name: string }[]
  >([]);
  const [keywords, setKeywords] = useState('');
  const { id: ruleId } = useParams();
  const pagination = usePagination();
  const isMsgRouter = routeType === 'msg';

  const { pageNum, pageSize, setTotalSize } = pagination;

  const { deviceList, total, isLoading, isSuccess, refetch } =
    useRuleDevicesQuery({
      ruleId: ruleId || '',
      pageNum,
      pageSize,
      keywords,
    });

  if (isSuccess) {
    setTotalSize(total);
  }

  const columns: ReadonlyArray<Column<DeviceColumnData>> = [
    {
      Header: '设备名称',
      Cell: useCallback(({ row }: CellProps<DeviceColumnData>) => {
        const { id, name } = row.original;
        const deviceName = name || '';

        return (
          <HStack>
            <SmartObjectTwoToneIcon size="24px" />
            <NavigateToDeviceDetailInOtherPlugins id={id}>
              <Text
                maxWidth="150px"
                // color="gray.600"
                fontSize="12px"
                fontWeight="500"
                noOfLines={1}
                title={deviceName}
              >
                {deviceName}
              </Text>
            </NavigateToDeviceDetailInOtherPlugins>
          </HStack>
        );
      }, []),
    },
    {
      Header: '设备状态',
      width: 100,
      Cell: useCallback(({ row }: CellProps<DeviceColumnData>) => {
        const { status } = row.original;
        return <DeviceStatusIcon isOnline={status === 'online'} />;
      }, []),
    },
    {
      Header: '设备模板',
      accessor: 'templateName',
      Cell: useCallback(
        ({
          value,
          row,
        }: CellProps<DeviceColumnData, DeviceColumnData['templateName']>) => {
          const templateName = value || '-';
          return (
            <NavigateToDeviceTemplateDetailInOtherPlugins
              id={row.original.templateId}
            >
              <Text
                // color="gray.700"
                maxWidth="150px"
                noOfLines={1}
                title={templateName}
              >
                {templateName}
              </Text>
            </NavigateToDeviceTemplateDetailInOtherPlugins>
          );
        },
        []
      ),
    },
    {
      Header: '设备分组',
      accessor: 'parentName',
      Cell: useCallback(
        ({
          value,
        }: CellProps<DeviceColumnData, DeviceColumnData['parentName']>) => {
          const parentName = value || '-';
          return (
            <Text
              color="gray.700"
              maxWidth="180px"
              noOfLines={1}
              title={parentName}
            >
              {parentName}
            </Text>
          );
        },
        []
      ),
    },
    {
      Header: '操作',
      width: 60,
      Cell: useCallback(
        ({ row }: CellProps<DeviceColumnData>) => {
          const { id, name } = row.original;
          const buttons = [
            <DeleteDevicesButton
              key="delete"
              selectedDevices={[{ id, name }]}
              refetchData={() => refetch()}
            />,
          ];
          if (isMsgRouter) {
            buttons.unshift(
              <MoveRoutingRuleButton
                key="move"
                selectedIds={[id]}
                refetchData={() => refetch()}
              />
            );
          }
          return <MoreAction buttons={buttons} />;
        },
        [isMsgRouter, refetch]
      ),
    },
  ];

  const deviceTableData = useMemo(() => {
    return deviceList.map((item) => {
      const {
        id,
        name,
        template_id: templateId,
        template,
        group_name: groupName,
        status,
      } = item;
      return {
        id,
        name,
        status,
        templateId,
        templateName: template,
        parentName: groupName,
      };
    });
  }, [deviceList]);

  const handleSelect = useCallback(
    ({ selectedFlatRows }: { selectedFlatRows: DeviceColumnData[] }) => {
      setSelectedDevices(
        selectedFlatRows.map((row) => ({
          id: row.id,
          name: row.name,
        }))
      );
    },
    []
  );

  return (
    <>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <TitleWrapper
          icon={<ReportFilledIcon color="grayAlternatives.300" size="20px" />}
          title="选择数据"
          description="选择设备所触发的数据"
        />
        <AddDevicesButton routeType={routeType} refetchData={() => refetch()} />
      </Flex>
      <Flex marginTop="20px" backgroundColor="gray.100" borderRadius="4px">
        {(() => {
          if (pageNum === 1 && !keywords) {
            if (isLoading) {
              return (
                <Loading
                  styles={{ wrapper: { width: '100%', height: '104px' } }}
                />
              );
            }

            if (deviceList.length === 0) {
              return (
                <Center width="100%" height="104px">
                  <Text color="gray.600" fontSize="14px" lineHeight="32px">
                    暂未选择任何设备数据，请
                    {isMsgRouter ? '' : '通过设备模板'}
                  </Text>
                  <AddDevicesButton
                    type="link"
                    routeType={routeType}
                    refetchData={() => refetch()}
                  />
                </Center>
              );
            }
          }

          const buttons = [
            <DeleteDevicesButton
              key="delete"
              selectedDevices={selectedDevices}
              refetchData={() => refetch()}
            />,
          ];
          if (isMsgRouter) {
            buttons.unshift(
              <MoveRoutingRuleButton
                key="move"
                selectedIds={selectedDevices.map(({ id }) => id)}
                refetchData={() => {
                  refetch();
                }}
              />
            );
          }

          return (
            <Flex flex="1" flexDirection="column" padding="20px">
              <Flex
                padding="0 20px"
                justifyContent="space-between"
                alignItems="center"
                border="1px"
                borderColor="grayAlternatives.50"
                borderRadius="4px"
                color="gray.700"
                fontSize="14px"
                height="64px"
                backgroundColor="white"
                cursor="pointer"
                onClick={() => setShowDeviceList(!showDeviceList)}
              >
                <Flex alignItems="center">
                  <Text>转发</Text>
                  <Text margin="0 2px" color="primary" fontWeight="500">
                    {total}
                  </Text>
                  <Text>台设备</Text>
                </Flex>
                {showDeviceList ? (
                  <ChevronUpFilledIcon />
                ) : (
                  <ChevronDownFilledIcon />
                )}
              </Flex>
              {showDeviceList && (
                <Flex
                  marginTop="12px"
                  padding="20px"
                  flexDirection="column"
                  flex="1"
                  borderRadius="4px"
                  backgroundColor="gray.50"
                >
                  {selectedDevices.length > 0 ? (
                    <MoreAction
                      type="text"
                      buttons={buttons}
                      styles={{ wrapper: { margin: '6px 0', width: '92px' } }}
                    />
                  ) : (
                    <SearchInput
                      onSearch={(value) => setKeywords(value)}
                      height="44px"
                      inputGroupStyle={{ width: '100%' }}
                      inputStyle={{ borderRadius: '30px' }}
                    />
                  )}
                  <Table
                    columns={columns}
                    data={deviceTableData}
                    isLoading={isLoading}
                    hasKeywords={!!keywords}
                    onSelect={handleSelect}
                    paginationProps={pagination}
                    scroll={{ y: '296px' }}
                    styles={{
                      wrapper: {
                        flex: 1,
                        marginTop: '20px',
                        overflow: 'hidden',
                        backgroundColor: 'gray.50',
                      },
                      loading: {
                        height: '340px',
                      },
                      empty: {
                        height: '340px',
                      },
                      head: { backgroundColor: 'gray.100' },
                      headTr: { height: '44px', border: 'none' },
                      bodyTr: {
                        marginTop: '8px',
                        border: 'none',
                        backgroundColor: 'white',
                      },
                      pagination: {
                        padding: '0 20px',
                      },
                    }}
                  />
                </Flex>
              )}
              {isMsgRouter && <RuleSQL sx={{ marginTop: '20px' }} />}
            </Flex>
          );
        })()}
      </Flex>
    </>
  );
}
