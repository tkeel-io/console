import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Tips } from '@tkeel/console-components';

// import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import OverviewBox from '../OverviewBox';
import OverviewItem from '../OverviewItem';
import Progress from '../Progress';

export default function OverviewModule() {
  const navigate = useNavigate();
  // const tenantId = useTenantId();

  return (
    <HStack width="full" spacing="8px">
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

      <OverviewBox onClick={() => navigate('../usage')}>
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

      <OverviewBox onClick={() => navigate('../usage')}>
        <OverviewItem
          label="路由数 (个)"
          value="8"
          subValue="/20"
          sx={{ width: '40%', paddingRight: '48px' }}
        />
        <Box flex="1" marginRight="8px">
          <Flex justifyContent="space-between" paddingBottom="8px">
            <OverviewItem
              label={
                <Flex alignItems="center">
                  <Text paddingRight="4px">规则执行次数</Text>
                  <Tips tooltipLabel="24 小时内规则执行次数" />
                </Flex>
              }
              value="64"
            />
            <OverviewItem label="失败率" value="12" subValue="%" />
          </Flex>
          <Progress total={100} value={30} restColor="red.300" />
        </Box>
      </OverviewBox>
    </HStack>
  );
}
