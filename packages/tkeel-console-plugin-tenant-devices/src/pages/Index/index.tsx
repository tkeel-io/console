import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components/';

import DeviceGroupNav from './DeviceGroupNav';

import { CreateDeviceButton } from '@/tkeel-console-plugin-tenant-devices/components/buttons';

const handleSearchDevice = (keyword: string) => {
  // eslint-disable-next-line no-console
  console.log(keyword);
};

function Index(): JSX.Element {
  return (
    <Flex flexDirection="column" h="100%">
      <Flex h="48px" w="100%" align="center">
        <Heading as="h3" fontSize="14px" lineHeight="32px">
          设备列表
        </Heading>
        <Spacer />
        <SearchInput
          onSearch={handleSearchDevice}
          inputStyle={{ bg: 'gray.50' }}
          inputGroupStyle={{ mr: '16px' }}
        />
        <CreateDeviceButton />
      </Flex>
      <Flex flex="1">
        <DeviceGroupNav />
        <Box flex="1" bg="white">
          分组列表
        </Box>
      </Flex>
    </Flex>
  );
}

export default Index;
