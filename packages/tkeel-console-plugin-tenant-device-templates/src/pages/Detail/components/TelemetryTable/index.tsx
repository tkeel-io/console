import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';

import {
  CreateTelemetryButton,
  DeleteTelemetryButton,
  EditTelemetryButton,
} from '@tkeel/console-business-components';
import {
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';
import { useModifyTelemetryMutation } from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import useListTemplateTelemetryQuery, {
  UsefulData as Data,
} from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useListTemplateTelemetryQuery';

import DetailTelemetryButton from '../DetailTelemetryButton';

function Index({ id, title }: { id: string; title: string }) {
  const toast = plugin.getPortalToast();

  const [keywords, setKeyWords] = useState('');

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;

  let params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'created_at',
    is_descending: true,
    key_words: '',
    id: '',
  };
  params = { ...params, id };

  if (keywords) {
    params = { ...params, key_words: keywords };
    // eslint-disable-next-line no-console
    console.log('Index ~ params', params);
  }
  const {
    usefulData: data,
    isLoading,
    refetch,
  } = useListTemplateTelemetryQuery({
    id,
    onSuccess(res) {
      if (JSON.stringify(res.data?.templateTeleObject?.configs) !== '{}') {
        const total = Object.keys(
          res.data.templateTeleObject.configs.telemetry.define.fields
        ).length;
        setTotalSize(total);
        return;
      }
      setTotalSize(0);
    },
  });

  const { mutate } = useModifyTelemetryMutation({
    id,
    onSuccess() {
      // onSuccess();
      toast('更新成功', { status: 'success' });
      refetch();
      // refetchData();
      // onClose();
    },
  });

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '遥测名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <DuotoneTwoToneIcon />
              <Text color="gray.800" fontWeight="600" marginLeft="14px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '遥测ID',
      width: 100,
      accessor: 'id',
    },
    {
      Header: '数据类型',
      width: 110,
      accessor: 'type',
    },
    {
      Header: '时间戳',
      accessor: 'last_time',
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
      Header: '描述',
      width: 110,
      accessor: 'description',
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
                <DetailTelemetryButton
                  key="detail"
                  id={original.id}
                  uid={id}
                />,
                <EditTelemetryButton
                  key="modify"
                  defaultValues={original}
                  handleSubmit={(formValues) => {
                    mutate({
                      data: formValues,
                    });
                  }}
                />,
                <DeleteTelemetryButton
                  key="delete"
                  attributeInfo={{ name: original.name, id: original.id }}
                  uid={id}
                  refetchData={() => {
                    refetch();
                  }}
                />,
              ]}
            />
          );
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%" margin="0 20px">
      <PageHeaderToolbar
        name="遥测模板"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        buttons={useMemo(() => {
          return [
            <CreateTelemetryButton
              key="create"
              id={id}
              refetchData={() => {
                refetch();
              }}
            />,
          ];
        }, [id, refetch])}
      />
      <Table
        scroll={{ y: '100%' }}
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'whiteAlias',
          },
        }}
        columns={columns}
        data={data || []}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        empty={
          <Empty
            description={
              <Box>
                <Box display="inline" color="gray.600" fontWeight="500">
                  [{title}]
                </Box>
                暂无数据
              </Box>
            }
            styles={{
              wrapper: { height: '100%' },
              content: { marginTop: '10px' },
            }}
            title=""
          />
        }
      />
    </Flex>
  );
}

export default Index;
