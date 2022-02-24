import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { PageHeaderToolbar } from '@tkeel/console-components';

import DeviceInfoCard from './components/DeviceInfoCard';
import SearchDeviceInput from './components/SearchDeviceInput';

import SearchBg from '@/tkeel-console-plugin-tenant-data-query/assets/images/search-bg.svg';

function Index(): JSX.Element {
  return (
    <Flex height="100%" paddingBottom="18px" flexDirection="column">
      <PageHeaderToolbar name="数据查询" hasIcon />
      <Flex
        marginTop="80px"
        flex="1"
        flexDirection="column"
        alignItems="center"
      >
        <Image marginBottom="32px" width="25%" src={SearchBg} />
        <SearchDeviceInput />
      </Flex>
      <Box width="100%">
        <Text color="gray.700" fontSize="14px">
          最新关注
        </Text>
        <Flex marginTop="12px" justifyContent="space-between">
          <DeviceInfoCard style={{ width: '24.5%' }} />
          <DeviceInfoCard style={{ width: '24.5%' }} />
          <DeviceInfoCard style={{ width: '24.5%' }} />
          <DeviceInfoCard style={{ width: '24.5%' }} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
