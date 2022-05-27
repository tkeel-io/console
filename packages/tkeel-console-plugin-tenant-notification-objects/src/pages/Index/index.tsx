import { Center, Flex } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { HornTwoToneIcon, RefreshCircleFilledIcon } from '@tkeel/console-icons';

export default function Index() {
  return (
    <Flex flexDirection="column" h="100%" padding="8px 20px 20px">
      <PageHeader
        icon={<HornTwoToneIcon size={40} />}
        name="通知对象"
        desc="通知对象"
      />
      <Flex
        m="16px 0"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <SearchInput
          placeholder="支持搜索对象组名"
          onSearch={(value) => {
            console.log(value);
          }}
          width="100%"
          inputStyle={{ bgColor: 'white' }}
        /> */}
        <Flex justifyContent="space-between" alignItems="center">
          <Center
            h="32px"
            w="32px"
            bgColor="gray.100"
            borderRadius="50%"
            m="0 12px"
          >
            <RefreshCircleFilledIcon size={17} />
          </Center>
          {/* <CreateNotificationButton
            key="create"
            type="createButton"
            onSuccess={handleCreateNetworkSuccess}
          /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}
