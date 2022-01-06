/* eslint-disable simple-import-sort/imports */
/* eslint-disable no-console */
import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { PageHeader, SearchInput } from '@tkeel/console-components';
import { AddFilledIcon, HumanVipFilledIcon } from '@tkeel/console-icons';
import Table from '@/tkeel-console-plugin-tenant/components/Table';

const handleSearch = (keyword: string) => {
  console.log('keyword', keyword);
};
const mockData = [
  {
    firstName: 'nation',
    lastName: 'county',
    age: 14,
    visits: 66,
    progress: 3,
    status: 'relationship',
  },
  {
    firstName: 'stream',
    lastName: 'hydrant',
    age: 7,
    visits: 16,
    progress: 47,
    status: 'complicated',
  },
  {
    firstName: 'scarecrow',
    lastName: 'signature',
    age: 11,
    visits: 26,
    progress: 59,
    status: 'single',
  },
  {
    firstName: 'dad',
    lastName: 'attraction',
    age: 24,
    visits: 92,
    progress: 7,
    status: 'complicated',
  },
  {
    firstName: 'industry',
    lastName: 'charity',
    age: 2,
    visits: 81,
    progress: 97,
    status: 'complicated',
  },
  {
    firstName: 'chalk',
    lastName: 'yam',
    age: 6,
    visits: 83,
    progress: 70,
    status: 'complicated',
  },
  {
    firstName: 'bike',
    lastName: 'blood',
    age: 17,
    visits: 29,
    progress: 51,
    status: 'relationship',
  },
  {
    firstName: 'measure',
    lastName: 'king',
    age: 10,
    visits: 74,
    progress: 83,
    status: 'single',
  },
  {
    firstName: 'machine',
    lastName: 'number',
    age: 2,
    visits: 55,
    progress: 35,
    status: 'complicated',
  },
  {
    firstName: 'needle',
    lastName: 'mailbox',
    age: 24,
    visits: 89,
    progress: 49,
    status: 'complicated',
  },
  {
    firstName: 'distance',
    lastName: 'beds',
    age: 0,
    visits: 20,
    progress: 0,
    status: 'single',
  },
  {
    firstName: 'top',
    lastName: 'dad',
    age: 15,
    visits: 63,
    progress: 36,
    status: 'complicated',
  },
  {
    firstName: 'hill',
    lastName: 'engineering',
    age: 4,
    visits: 87,
    progress: 65,
    status: 'complicated',
  },
  {
    firstName: 'bag',
    lastName: 'lab',
    age: 28,
    visits: 59,
    progress: 34,
    status: 'single',
  },
  {
    firstName: 'method',
    lastName: 'turn',
    age: 16,
    visits: 70,
    progress: 8,
    status: 'single',
  },
  {
    firstName: 'sisters',
    lastName: 'environment',
    age: 0,
    visits: 6,
    progress: 80,
    status: 'complicated',
  },
  {
    firstName: 'eggnog',
    lastName: 'hands',
    age: 5,
    visits: 73,
    progress: 14,
    status: 'complicated',
  },
  {
    firstName: 'elbow',
    lastName: 'market',
    age: 10,
    visits: 5,
    progress: 78,
    status: 'single',
  },
  {
    firstName: 'joke',
    lastName: 'description',
    age: 15,
    visits: 75,
    progress: 25,
    status: 'complicated',
  },
  {
    firstName: 'control',
    lastName: 'weakness',
    age: 22,
    visits: 51,
    progress: 61,
    status: 'complicated',
  },
];
const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
  },
];
function Index(): JSX.Element {
  return (
    <Flex flexDirection="column" height="100%">
      <PageHeader
        icon={<HumanVipFilledIcon size={26} />}
        name="租户管理"
        desc="管理租户空间，管理租户空间用户。"
      />
      <Box
        flex="1"
        mt="16px"
        p="16px 24px"
        bg="white"
        boxSize="border-box"
        boxShadow="xl"
      >
        <Flex align="center" h="36px" mb="16px">
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
          >
            创建租户空间
          </Button>
        </Flex>
        <Flex>
          <Table data={mockData} columns={columns} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
