import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';

import {
  CreateAttributeButton,
  DeleteAttributeButton,
  UpdateAttributeButton,
} from '@tkeel/console-business-components';
import { RW_LABELS } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import {
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { DuotoneTwoToneIcon } from '@tkeel/console-icons';
import { AttributeItem } from '@tkeel/console-types';

// import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';
import useListTemplateAttributeQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useListTemplateAttributeQuery';
// import { DeviceAttributeFormFields  } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';

// import { plugin } from '@tkeel/console-utils';

function AttributeTable({ id, title }: { id: string; title: string }) {
  // const toast = plugin.getPortalToast();

  const [keywords, setKeyWords] = useState('');
  const { attributeList, isLoading, refetch } = useListTemplateAttributeQuery({
    id,
    onSuccess() {},
  });

  const columns: ReadonlyArray<Column<AttributeItem>> = [
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
      Cell: ({ row }: Cell<AttributeItem>) =>
        useMemo(() => {
          const { original } = row;
          return <Box>{original?.define?.default_value}</Box>;
        }, [row]),
    },
    {
      Header: '读写类型',
      width: 110,
      Cell: ({ row }: Cell<AttributeItem>) =>
        useMemo(() => {
          const { original } = row;
          const map = new Map(Object.entries(RW_LABELS));
          return <Box>{map.get(original?.define?.rw)}</Box>;
        }, [row]),
    },

    {
      Header: '操作',
      width: 80,
      Cell: ({ row }: Cell<AttributeItem>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <MoreAction
              buttons={[
                <UpdateAttributeButton
                  key="edit"
                  uid={id}
                  defaultValues={original}
                  refetch={refetch}
                />,
                <DeleteAttributeButton
                  key="delete"
                  defaultValues={original}
                  uid={id}
                  refetch={refetch}
                />,
              ]}
            />
          );
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="属性模板"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        styles={{
          wrapper: { height: '32px', marginBottom: '12px' },
          title: { fontSize: '14px' },
        }}
        buttons={[
          <CreateAttributeButton uid={id} refetch={refetch} key="add" />,
        ]}
      />
      <Table
        styles={{
          wrapper: {
            flex: 1,
          },
        }}
        scroll={{ y: '100%' }}
        columns={columns}
        data={attributeList.filter((item) => {
          return item.name.includes(keywords);
        })}
        isShowStripe
        isLoading={isLoading}
        // paginationProps={pagination}
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
