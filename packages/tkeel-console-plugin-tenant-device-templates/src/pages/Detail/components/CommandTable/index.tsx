import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';

import {
  CreateCommandButton,
  DeleteCommandButton,
  UpdateCommandButton,
} from '@tkeel/console-business-components';
import {
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { AppsTwoToneIcon } from '@tkeel/console-icons';
import { CommandItem } from '@tkeel/console-types';

import useListTemplateCommandQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useListTemplateCommandQuery';

const FILTER_COLUMNS = ['name', 'id'];

function getFilterList({
  list,
  keywords,
}: {
  list: CommandItem[];
  keywords: string;
}) {
  if (keywords) {
    return list.filter((item) => {
      return FILTER_COLUMNS.find((key) =>
        (item[key] as string).includes(keywords)
      );
    });
  }
  return list;
}

interface Props {
  id: string;
  title: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CommandTable({ id, title }: Props) {
  const [keywords, setKeywords] = useState('');
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
  };
  const { commandList, isLoading, refetch } = useListTemplateCommandQuery({
    id,
    onSuccess() {},
  });
  const operateCell = useCallback(
    ({ row }: Cell<CommandItem>) => {
      const { original } = row;
      return (
        <MoreAction
          buttons={[
            <UpdateCommandButton
              key="modify"
              uid={id}
              refetch={refetch}
              data={original}
            />,
            <DeleteCommandButton
              key="delete"
              data={original}
              uid={id}
              refetch={refetch}
            />,
          ]}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const columns: ReadonlyArray<Column<CommandItem>> = [
    {
      Header: '遥测名称',
      width: 200,
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <AppsTwoToneIcon size="16px" />
              <Text color="gray.800" fontWeight="600" marginLeft="14px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '命令ID',
      width: 200,
      accessor: 'id',
    },
    {
      Header: '描述',
      width: 120,
      accessor: 'description',
    },
    {
      Header: '操作',
      width: 80,
      Cell: operateCell,
    },
  ];
  return (
    <Flex flex="1" direction="column" height="100%">
      <PageHeaderToolbar
        styles={{
          wrapper: { height: '32px', marginBottom: '12px' },
          title: { fontSize: '14px' },
        }}
        name="服务命令"
        hasSearchInput
        searchInputProps={{
          onSearch: handleSearch,
        }}
        buttons={[
          <CreateCommandButton key="create" uid={id} refetch={refetch} />,
        ]}
      />
      <Table
        columns={columns}
        isLoading={isLoading}
        data={getFilterList({ list: commandList, keywords })}
        scroll={{ y: '100%' }}
        isShowStripe
        hasPagination={false}
        styles={{
          wrapper: { flex: 1, overflow: 'hidden' },
          bodyTr: { fontSize: '12px' },
        }}
        empty={
          <Empty
            description={
              <Box>
                <Box display="inline" color="gray.600" fontWeight="500">
                  「{title}」
                </Box>
                暂无数据
              </Box>
            }
            title=""
          />
        }
      />
    </Flex>
  );
}
