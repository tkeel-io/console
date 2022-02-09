/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useGlobalProps } from '@tkeel/console-business-components';
import { Empty, PageHeader, SearchInput } from '@tkeel/console-components';
import { AddFilledIcon, HumanVipFilledIcon } from '@tkeel/console-icons';

import { EditSpaceModal } from '@/tkeel-console-plugin-admin-tenants/components';
import TenantSpaceTable from '@/tkeel-console-plugin-admin-tenants/components/TenantSpaceTable';
import useTenantsQuery from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

const handleSearch = (keyword: string) => {
  console.log('keyword', keyword);
};

function IndexComponent(): JSX.Element {
  const { navigate } = useGlobalProps();
  const { tenantList } = useTenantsQuery();
  const LinkToSpaceDetail = () => {
    navigate('/admin-tenants/detail/12029389');
  };
  const columns = [
    {
      Header: '租户空间',
      accessor: 'title',
      Cell: () => {
        return (
          <Button size="small" variant="link" onClick={LinkToSpaceDetail}>
            IDC项目
          </Button>
        );
      },
    },
    { Header: '用户ID', accessor: 'id' },
    { Header: '管理员账号', accessor: 'admin' },
    { Header: '创建时间', accessor: 'createTime' },
    { Header: '备注', accessor: 'remark' },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDirection="column" height="100%">
      <PageHeader
        icon={<HumanVipFilledIcon size={26} />}
        name="租户管理"
        desc="管理租户空间，管理租户空间用户。"
      />
      <Flex
        flexDirection="column"
        // display="flex"
        flex="1"
        bg="white"
        boxShadow="xl"
        overflow="hidden"
        // pos="relative"
        mt="16px"
      >
        <Flex align="center" h="40px" m="16px 24px">
          <Box flex="1" mr="16px">
            <SearchInput
              width="100%"
              placeholder="搜索租户空间、ID、管理员账号、备注"
              onSearch={handleSearch}
            />
          </Box>
          <Button
            leftIcon={<AddFilledIcon color="white" />}
            size="sm"
            w="140px"
            onClick={onOpen}
          >
            创建租户空间
          </Button>
          <EditSpaceModal isOpen={isOpen} onClose={onClose} />
        </Flex>
        {tenantList?.length > 0 ? (
          <TenantSpaceTable data={tenantList} columns={columns} />
        ) : (
          <Empty
            title="暂无空间"
            description="您可前往页面右上角「创建租户空间」"
            styles={{ wrapper: { height: '100%' } }}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default IndexComponent;
