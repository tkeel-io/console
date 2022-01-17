/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useGlobalProps } from '@tkeel/console-business-components';
import { PageHeader, SearchInput } from '@tkeel/console-components';
import { AddFilledIcon, HumanVipFilledIcon } from '@tkeel/console-icons';

import {
  EditSpaceModal,
  TenantSpaceTable,
} from '@/tkeel-console-plugin-admin-tenants/components';

const handleSearch = (keyword: string) => {
  console.log('keyword', keyword);
};

function IndexComponent(): JSX.Element {
  const { navigate } = useGlobalProps();
  const LinkToSpaceDetail = () => {
    navigate('/admin-tenants/detail/12029389');
  };
  const dataMock = Array.from({ length: 20 }).fill({
    col1: 'IDC项目',
    col2: 'ID_2011010',
    col3: 'admin',
    col4: '2021-04-23 12:11:11',
    col5: 'important',
  });
  const columns = [
    {
      Header: '租户空间',
      accessor: 'col1',
      Cell: () => {
        return (
          <Button size="small" variant="link" onClick={LinkToSpaceDetail}>
            IDC项目
          </Button>
        );
      },
    },
    { Header: '用户ID', accessor: 'col2' },
    { Header: '管理员账号', accessor: 'col3' },
    { Header: '创建时间', accessor: 'col4' },
    { Header: '备注', accessor: 'col5' },
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
        <Box p="0 24px" h="100%" overflowY="scroll" flex="1">
          <TenantSpaceTable data={dataMock} columns={columns} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default IndexComponent;
