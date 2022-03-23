import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';
// import { Column } from 'react-table';
// import MoveSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/MoveSubscriptionButton';
// import { plugin } from '@tkeel/console-utils';

import DetailTelemetryButton from '../DetailTelemetryButton';

import {
  CreateTelemetryButton,
  EditTelemetryButton,
  DeleteTelemetryButton,
} from '@tkeel/console-business-components';

import {
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { WebcamTwoToneIcon } from '@tkeel/console-icons';
// import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useListTemplateAttributeQuery, {
  UsefulData as Data,
} from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useListTemplateAttributeQuery';

function AttributeTable({ id, title }: { id: string; title: string }) {
  // const toast = plugin.getPortalToast();

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
    console.log('Index ~ params', params);
  }
  // const { data } = useListSubscribeEntitiesQuery(id);

  // refetch
  const {
    usefulData: data,
    isLoading,
    refetch,
  } = useListTemplateAttributeQuery({
    id,
    onSuccess(res) {
      // console.log('onSuccess ~ res');
      // const total = res?.data?.total ?? 0;
      const total = Object.keys(
        res.data.templateAttrObject.configs.telemetry.define.fields
      ).length;
      setTotalSize(total);
    },
  });

  // const { mutate } = useCreateTelemetryMutation({
  //   id,
  //   onSuccess() {},
  // });

  // setTotalSize(data?.total || 0);

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '属性名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <WebcamTwoToneIcon />
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
          console.log('useMemo ~ original', original);

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
                  handleSubmit={(formValues) => {
                    console.log('useMemo ~ formValues', formValues);
                    // refetch();
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
                // <DeleteDeviceButton
                //   onSuccess={() => {}}
                //   name={[original.name]}
                //   key="delete"
                //   selected_ids={[original.ID]}
                //   refetchData={() => {
                //     refetch();
                //   }}
                // />,
              ]}
            />
          );
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%" margin="0 20px">
      <PageHeaderToolbar
        name="属性模板"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateTelemetryButton
            key="create"
            id={id}
            refetchData={() => {
              refetch();
            }}
            // handleSubmit={(formValues) => {
            //   // eslint-disable-next-line no-console
            //   console.log('add', formValues);
            //   mutate({
            //     data: { [formValues.id]: formValues },
            //   });
            // }}
          />,
        ]}
      />
      <Table
        styles={{ wrapper: { flex: 1, height: '100%', minHeight: '60vh' } }}
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
                暂无设备,可手动添加
              </Box>
            }
            styles={{
              wrapper: { height: '100%' },
              content: { marginTop: '10px' },
            }}
            title=""
            // content={
            //   <Box mt="20px">
            //     <CreateDeviceButton
            //       key="create"
            //       onSuccess={handleCreateRoleSuccess}
            //     />
            //   </Box>
            // }
          />
        }
      />
    </Flex>
  );
}

export default AttributeTable;
