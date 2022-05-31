import { Box, Flex, HStack } from '@chakra-ui/react';

// import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

// import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import OverviewBox from './components/OverviewBox';
import OverviewItem from './components/OverviewItem';

export default function Overview() {
  // const tenantId = useTenantId();

  return (
    <Box>
      <ContentHeader title="概览" />
      <HStack spacing="8px">
        <OverviewBox>
          <Flex>
            <OverviewItem label="设备 (台)" value="8" subValue="/20" />
            <OverviewItem label="在线率" value="64" subValue="%" />
            <OverviewItem label="模版 (个)" value="12" subValue="/50" />
          </Flex>
          <Flex>s</Flex>
        </OverviewBox>
        <OverviewBox>
          <Flex>
            <OverviewItem label="设备 (台)" value="8" subValue="/20" />
            <OverviewItem label="在线率" value="64" subValue="%" />
            <OverviewItem label="模版 (个)" value="12" subValue="/50" />
          </Flex>
        </OverviewBox>
        <OverviewBox>
          <Flex>
            <OverviewItem label="设备 (台)" value="8" subValue="/20" />
            <OverviewItem label="在线率" value="64" subValue="%" />
            <OverviewItem label="模版 (个)" value="12" subValue="/50" />
          </Flex>
        </OverviewBox>
      </HStack>
    </Box>
  );
}
