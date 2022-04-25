import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';

import { DeviceStatusIcon } from '@tkeel/console-business-components';
import {
  MoreAction,
  PageHeaderToolbar,
  SearchEmpty,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useListSubscribeEntitiesQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeEntitiesQuery';

import CreateDeviceButton from '../CreateDeviceButton';
import DeleteDeviceButton from '../DeleteDeviceButton';
import Empty from '../Empty';
import MoveSubscriptionButton from '../MoveSubscriptionButton';

type Data = {
  ID: string;
  group: string;
  name: string;
  status: string;
  template: string;
  updated_at: string;
};

type Props = {
  id: string;
  title: string;
  refetchSubscribeInfo: () => unknown;
};

export default function Index({ id, title, refetchSubscribeInfo }: Props) {
  const [keywords, setKeyWords] = useState('');

  const [rowIds, setRowIds] = useState<string[]>([]);
  const [rowNames, setRowNames] = useState<string[]>([]);

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;

  const { entities, isLoading, refetch } = useListSubscribeEntitiesQuery({
    id: id || '',
    pageNum,
    pageSize,
    keywords,
    onSuccess(res) {
      const total = res?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  const handleSelect = useCallback(
    ({ selectedFlatRows }: { selectedFlatRows: Data[] }) => {
      const selectedFlatRowsIds: string[] = [];
      const selectedFlatRowsNames: string[] = [];

      selectedFlatRows.forEach((item) => {
        selectedFlatRowsIds.push(item.ID);
        selectedFlatRowsNames.push(item.name);
      });

      setRowIds(selectedFlatRowsIds);
      setRowNames(selectedFlatRowsNames);
    },
    [setRowIds, setRowNames]
  );

  const handleRefetch = () => {
    // TODO 添加或移除设备后有延迟，临时处理方案
    setTimeout(() => {
      refetch();
      refetchSubscribeInfo();
    }, 700);
  };

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '设备名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <SmartObjectTwoToneIcon size={24} />
              <Text color="gray.800" fontWeight="600" marginLeft="14px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '设备状态',
      width: 100,
      accessor: 'status',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => <DeviceStatusIcon isOnline={value === 'online'} />,
          [value]
        ),
    },
    {
      Header: '设备模板',
      width: 100,
      accessor: 'template',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Box color="gray.700" overflow="hidden">
              {value}
            </Box>
          ),
          [value]
        ),
    },
    {
      Header: '设备分组',
      width: 110,
      accessor: 'group',
      Cell: ({ value }: { value: string }) =>
        useMemo(() => <Box color="gray.700">{value}</Box>, [value]),
    },
    {
      Header: '最后更新时间',
      accessor: 'updated_at',
      width: 200,
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Box>
              {formatDateTimeByTimestamp({
                timestamp: value,
              })}
            </Box>
          ),
          [value]
        ),
    },
    {
      Header: '操作',
      width: 80,
      Cell: ({ row }: Cell<Data>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <MoreAction
              buttons={[
                <MoveSubscriptionButton
                  selected_ids={[original.ID]}
                  key="modify"
                  onSuccess={() => handleRefetch()}
                />,
                <DeleteDeviceButton
                  onSuccess={() => {}}
                  name={[original.name]}
                  key="delete"
                  selected_ids={[original.ID]}
                  refetchData={() => handleRefetch()}
                />,
              ]}
            />
          );
        }, [row]),
    },
  ];

  const noData = pageNum === 1 && !keywords && entities.length === 0;

  return (
    <Flex flexDirection="column" height="100%" margin="0 20px">
      <PageHeaderToolbar
        name={
          rowNames.length > 0 ? (
            <MoreAction
              type="text"
              buttons={[
                <MoveSubscriptionButton
                  selected_ids={rowIds}
                  key="modify"
                  onSuccess={() => handleRefetch()}
                />,
                <DeleteDeviceButton
                  onSuccess={() => {}}
                  name={rowNames}
                  key="delete"
                  selected_ids={rowIds}
                  refetchData={() => handleRefetch()}
                />,
              ]}
            />
          ) : (
            '订阅设备'
          )
        }
        hasSearchInput={!noData}
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        buttons={
          noData
            ? []
            : [
                <CreateDeviceButton
                  key="create"
                  refetchData={() => handleRefetch()}
                />,
              ]
        }
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
        data={entities}
        onSelect={handleSelect}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        empty={
          keywords ? (
            <SearchEmpty
              styles={{
                wrapper: { height: '100%' },
                image: { width: '80px' },
                text: { color: 'gray.500', fontSize: '14px' },
              }}
            />
          ) : (
            <Empty title={title} refetchData={() => handleRefetch()} />
          )
        }
      />
    </Flex>
  );
}
