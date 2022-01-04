/* eslint-disable no-console */
import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { PageHeader, SearchInput } from '@tkeel/console-components';
import { AddFilledIcon, HumanVipFilledIcon } from '@tkeel/console-icons';

const handleSearch = (keyword: string) => {
  console.log('keyword', keyword);
};

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
        <Flex align="center" h="36px">
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
      </Box>
    </Flex>
  );
}

export default Index;
