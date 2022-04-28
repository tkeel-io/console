import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { Loading, PageHeaderToolbar } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import SearchBg from '@/tkeel-console-plugin-tenant-data-query/assets/images/search-bg.svg';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-data-query/components/DeviceInfoCard';
import useHistoryQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useHistoryQuery';

import SearchDeviceInput from './components/SearchDeviceInput';

function Index(): JSX.Element {
  const { history, isLoading } = useHistoryQuery();
  const documents = plugin.getPortalDocuments();

  return (
    <Flex height="100%" flexDirection="column">
      <PageHeaderToolbar
        name="数据查询"
        documentsPath={documents.config.paths.tenantGuide.dataQuery}
      />
      <Flex
        marginTop="80px"
        flex="1"
        flexDirection="column"
        alignItems="center"
      >
        <Image marginBottom="32px" height="120px" src={SearchBg} />
        <SearchDeviceInput />
      </Flex>
      {history?.length > 0 && (
        <Box width="100%">
          <Text color="gray.700" fontSize="14px">
            最新关注
          </Text>
          <Flex marginTop="12px" marginRight="-8px">
            {isLoading ? (
              <Loading
                styles={{ wrapper: { width: '100%', height: '152px' } }}
              />
            ) : (
              history
                ?.slice(0, 4)
                .map((item) => (
                  <DeviceInfoCard
                    key={item.id}
                    device={item}
                    style={{ width: '25%', marginRight: '8px' }}
                  />
                ))
            )}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}

export default Index;
