import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components/';

import CreateDeviceButton from './components/CreateDeviceButton';
import DeviceGroupNav from './components/DeviceGroupNav';
import DeviceListTable from './components/DeviceListTable';
import GroupBasicInfo from './components/GroupBasicInfo';

const handleSearchDevice = (keyword: string) => {
  // eslint-disable-next-line no-console
  console.log(keyword);
};
const groupInfo = {
  description: '测试设备子组_a',
  ext: {
    厂商: 'qingcloud2',
    版本: '1.0.1',
  },
  name: '测试设备子组_a',
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
        <Flex flex="1" bg="white" p="12px 20px" flexDirection="column">
          <Box
            color="grayAlternatives.300"
            h="24px"
            fontSize="14px"
            lineHeight="24px"
            mb="8px"
          >
            当前分组：默认分组/自定义分组3
          </Box>
          <GroupBasicInfo groupInfo={groupInfo} />
          <DeviceListTable />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Index;
