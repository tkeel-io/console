import { Box, Flex, HStack } from '@chakra-ui/react';

// import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import ContentHeader from '@/tkeel-console-plugin-admin-usage-statistics/components/ContentHeader';

// import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import OverviewBox from './components/OverviewBox';
import OverviewItem from './components/OverviewItem';
import Progress from './components/Progress';

export default function Overview() {
  // const tenantId = useTenantId();

  return (
    <Box>
      <ContentHeader title="概览" />
      <HStack spacing="8px">
        <OverviewBox>
          <Box flex="1" paddingRight="70px">
            <Flex justifyContent="space-between" paddingBottom="8px">
              <OverviewItem
                label="设备 (台)"
                value="8"
                subValue="/20"
                sx={{ paddingRight: '48px' }}
              />
              <OverviewItem label="在线率" value="64" subValue="%" />
            </Flex>
            <Progress total={100} value={30} />
          </Box>
          <OverviewItem
            label="模版 (个)"
            value="12"
            subValue="/50"
            sx={{ flex: '1' }}
          />
        </OverviewBox>
        <OverviewBox>
          <OverviewItem
            label="订阅数 (个)"
            value="3"
            subValue="/5"
            sx={{ flex: '1', paddingRight: '48px' }}
          />
          <OverviewItem
            label="被订阅的设备数 (台)"
            value="4"
            subValue="/20"
            sx={{ flex: '1' }}
          />
        </OverviewBox>
        <OverviewBox>
          <OverviewItem
            label="路由数 (个)"
            value="8"
            subValue="/20"
            sx={{ width: '40%', paddingRight: '48px' }}
          />
          <Box flex="1" marginRight="8px">
            <Flex justifyContent="space-between" paddingBottom="8px">
              <OverviewItem label="规则执行次数" value="64" />
              <OverviewItem label="失败率" value="12" subValue="%" />
            </Flex>
            <Progress total={100} value={30} restColor="red.300" />
          </Box>
        </OverviewBox>
      </HStack>
    </Box>
  );
}
