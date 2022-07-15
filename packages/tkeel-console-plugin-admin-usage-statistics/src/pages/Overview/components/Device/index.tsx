import { Box, Flex, HStack, Skeleton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Tips } from '@tkeel/console-components';

import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import { findValueInResults } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import DeviceBox, { sx } from './DeviceBox';
import DeviceItem from './DeviceItem';
import Progress from './Progress';

function CustomSkeleton() {
  return <Skeleton {...sx} />;
}

const METERS = [
  'sum_device_num',
  'rate_online',
  'sum_template_num',
  'subscribe_num',
  'subscribe_entities_num',
  'rule_num',
  'rule_execute_num_24h',
  'rate_rule_failure_24h',
];

export default function Device() {
  const navigate = useNavigate();
  const { isLoading, results } = usePrometheusTKMeterBatchQuery({
    params: { meters: METERS },
  });
  const [
    sumDeviceNum,
    rateOnline,
    sumTemplateNum,
    subscribeNum,
    subscribeEntitiesNum,
    ruleNum,
    ruleExecuteNum24h,
    rateRuleFailure24h,
  ] = METERS.map((query) => findValueInResults({ data: results, query }));

  return (
    <HStack width="full" spacing="8px">
      {isLoading ? (
        <>
          <CustomSkeleton />
          <CustomSkeleton />
          <CustomSkeleton />
        </>
      ) : (
        <>
          <DeviceBox>
            <Box width="66%">
              <Flex justifyContent="space-between" paddingBottom="8px">
                <DeviceItem
                  label="设备 (台)"
                  value={sumDeviceNum}
                  sx={{ paddingRight: '48px' }}
                />
                <DeviceItem
                  label="在线率"
                  value={rateOnline}
                  subValue="%"
                  subValueFormatter={false}
                />
              </Flex>
              <Progress value={rateOnline} />
            </Box>
            <DeviceItem
              label="模版 (个)"
              value={sumTemplateNum}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                flex: '1',
                paddingLeft: '20px',
              }}
            />
          </DeviceBox>

          <DeviceBox onClick={() => navigate('../usage')}>
            <DeviceItem
              label="订阅数 (个)"
              value={subscribeNum}
              sx={{ flex: '1', paddingRight: '48px' }}
            />
            <DeviceItem
              label="被订阅的设备数 (台)"
              value={subscribeEntitiesNum}
              sx={{ flex: '1' }}
            />
          </DeviceBox>

          <DeviceBox onClick={() => navigate('../usage')}>
            <DeviceItem
              label="路由数 (个)"
              value={ruleNum}
              sx={{ width: '33%', paddingRight: '20px' }}
            />
            <Box flex="1" marginRight="8px">
              <Flex justifyContent="space-between" paddingBottom="8px">
                <DeviceItem
                  label={
                    <Flex alignItems="center">
                      <Text paddingRight="4px">规则执行次数</Text>
                      <Tips label="24 小时内规则执行次数" />
                    </Flex>
                  }
                  value={ruleExecuteNum24h}
                />
                <DeviceItem
                  label="失败率"
                  value={rateRuleFailure24h}
                  subValue="%"
                  subValueFormatter={false}
                />
              </Flex>
              <Progress value={100 - rateRuleFailure24h} restColor="red.300" />
            </Box>
          </DeviceBox>
        </>
      )}
    </HStack>
  );
}
