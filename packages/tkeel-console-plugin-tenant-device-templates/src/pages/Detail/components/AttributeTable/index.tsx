import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';

import { RW_LABELS } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import {
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';

// import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';
import useListTemplateAttributeQuery, {
  UsefulData as Data,
} from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useListTemplateAttributeQuery';

import AddAttributeButton from '../AddAttributeButton';
import DeleteAttributeButton from '../DeleteAttributeButton';
import EditAttributeButton from '../EditAttributeButton';

// import { DeviceAttributeFormFields  } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';

// import { plugin } from '@tkeel/console-utils';

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
    // eslint-disable-next-line no-console
    console.log('Index ~ params', params);
  }

  const {
    usefulData: data,
    isLoading,
    refetch,
  } = useListTemplateAttributeQuery({
    id,
    onSuccess(res) {
      if (JSON.stringify(res.data?.templateAttrObject?.configs) !== '{}') {
        const total = Object.keys(
          res.data.templateAttrObject.configs.attributes.define.fields
        ).length;
        setTotalSize(total);
      }
      setTotalSize(0);
    },
  });

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '属性名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <DuotoneTwoToneIcon size="20" />
              <Text color="gray.800" fontWeight="600" marginLeft="14px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '属性ID',
      width: 100,
      accessor: 'id',
    },
    {
      Header: '数据类型',
      width: 110,
      accessor: 'type',
    },
    {
      Header: '默认值',
      width: 110,
      Cell: ({ row }: Cell<Data>) =>
        useMemo(() => {
          const { original } = row;
          return <Box>{original?.define?.default_value}</Box>;
        }, [row]),
    },
    {
      Header: '读写类型',
      width: 110,
      Cell: ({ row }: Cell<Data>) =>
        useMemo(() => {
          const { original } = row;
          const map = new Map(Object.entries(RW_LABELS));
          return <Box>{map.get(original?.define?.rw)}</Box>;
        }, [row]),
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
                <EditAttributeButton
                  key="edit"
                  id={id}
                  defaultValues={original}
                  refetch={refetch}
                />,
                <DeleteAttributeButton
                  key="delete"
                  defaultValues={original}
                  id={id}
                  refetch={refetch}
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
        name="属性模板"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        buttons={[<AddAttributeButton id={id} refetch={refetch} key="add" />]}
      />
      <Table
        styles={{
          wrapper: {
            minH: '80vh',
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
        data={data.filter((item) => {
          return item.name.includes(keywords);
        })}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        hasPagination={false}
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

export default AttributeTable;
