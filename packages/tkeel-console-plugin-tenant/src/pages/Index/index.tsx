/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { PageHeader, SearchInput } from '@tkeel/console-components';
import { AddFilledIcon, HumanVipFilledIcon } from '@tkeel/console-icons';

import EditTenantSpaceModal from '@/tkeel-console-plugin-tenant/components/EditTenantSpaceModal';

const handleSearch = (keyword: string) => {
  console.log('keyword', keyword);
};

function Index(): JSX.Element {
  const [modalShow, setModalShow] = useState(true);
  const handleCreateTenantSpace = (): void => {
    setModalShow(true);
  };
  return (
    <Flex flexDirection="column" height="100%">
      <PageHeader
        icon={<HumanVipFilledIcon size={26} />}
        name="租户管理"
        desc="管理租户空间，管理租户空间用户。"
      />
      <Flex
        flex="1"
        mt="16px"
        bg="white"
        boxSize="border-box"
        boxShadow="xl"
        flexDirection="column"
      >
        <Flex align="center" h="36px" m="16px 24px">
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
            onClick={handleCreateTenantSpace}
          >
            创建租户空间
          </Button>
          <EditTenantSpaceModal
            title="创建租户空间"
            isOpen={modalShow}
            onClose={() => {
              setModalShow(false);
            }}
          />
        </Flex>
        <Box flex="1" overflow="scroll" h="100%" />
      </Flex>
    </Flex>
  );
}

export default Index;
