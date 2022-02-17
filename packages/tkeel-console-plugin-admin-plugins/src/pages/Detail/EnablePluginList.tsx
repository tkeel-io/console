import { useState } from 'react';
import { Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import { SearchInput, Table } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import usePluginsTenantsQuery, {
  Tenant,
} from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginsTenantsQuery';

type Props = {
  pluginName: string;
};

function EnablePluginList({ pluginName }: Props) {
  const [keyWords, setKeywords] = useState('');
  const { pageNum, pageSize, setTotalSize, ...rest } = usePagination({});

  const { tenants, data, isLoading, isSuccess } = usePluginsTenantsQuery({
    pluginName,
    pageNum,
    pageSize,
    keyWords,
  });

  if (isSuccess) {
    setTotalSize(data?.total ?? 0);
  }

  const columns: ReadonlyArray<Column<Tenant>> = [
    {
      Header: '启用时间',
      accessor: 'enable_timestamp',
      width: 150,
      disableSortBy: true,
      Cell({ value }) {
        return value ? formatDateTimeByTimestamp({ timestamp: value }) : '';
      },
    },
    {
      Header: '租户空间',
      accessor: 'title',
    },
    {
      Header: '租户ID',
      accessor: 'tenant_id',
    },
    {
      Header: '管理员账号',
      accessor: 'operator_id',
      width: 320,
    },
    {
      Header: '备注',
      accessor: 'remark',
    },
    {
      Header: '用户数',
      accessor: 'user_num',
      width: 100,
    },
  ];

  return (
    <Flex
      flexDirection="column"
      height="100%"
      padding="12px 20px"
      backgroundColor="white"
    >
      <Flex
        marginBottom="12px"
        height="32px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="gray.800" fontSize="14px" fontWeight="600">
          启用列表
        </Text>
        <SearchInput
          width="284px"
          placeholder="搜索"
          onSearch={(value) => setKeywords(value)}
        />
      </Flex>
      <Table
        style={{ flex: 1, overflow: 'hidden' }}
        columns={columns}
        data={tenants}
        isLoading={isLoading}
        isShowStripe
        defaultPageSize={20}
        scroll={{ y: '100%' }}
        paginationProps={{ pageNum, pageSize, setTotalSize, ...rest }}
      />
    </Flex>
  );
}

export default EnablePluginList;
