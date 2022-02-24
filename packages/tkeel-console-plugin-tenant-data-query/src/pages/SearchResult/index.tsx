import { Flex, Grid, Text } from '@chakra-ui/react';
import { PageHeaderToolbar } from '@tkeel/console-components';

import DeviceInfoCard from '@/tkeel-console-plugin-tenant-data-query/components/DeviceInfoCard';
import SearchDeviceInput from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/SearchDeviceInput';

export default function SearchResult() {
  return (
    <Flex height="100%" flexDirection="column">
      <Flex justifyContent="flex-start" alignItems="center">
        <PageHeaderToolbar
          name="数据查询"
          hasIcon
          styles={{ wrapper: { width: 'auto' } }}
        />
        <SearchDeviceInput style={{ marginLeft: '19%' }} type="searchResult" />
      </Flex>
      <Flex marginTop="16px" fontSize="12px" color="gray.800" lineHeight="24px">
        共
        <Text margin="0 3px" color="primary">
          23
        </Text>
        条结果
      </Flex>
      <Grid
        marginTop="12px"
        flex="1"
        overflow="auto"
        templateColumns="repeat(4, 1fr)"
        gap="8px"
        overflowY="auto"
      >
        {Array.from({ length: 20 })
          .fill('')
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <DeviceInfoCard key={i} />
          ))}
      </Grid>
    </Flex>
  );
}
