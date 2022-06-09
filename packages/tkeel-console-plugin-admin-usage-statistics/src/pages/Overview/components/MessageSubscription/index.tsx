import { Box, HStack } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';

import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import {
  findValues,
  getQueryParamsLast7Days,
} from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ModuleHeader from '../ModuleHeader';
import Chart from './Chart';
import MessageSubscriptionBox from './MessageSubscriptionBox';

const params = getQueryParamsLast7Days();

export default function MessageSubscription() {
  const upstreamMsgColor = useColor('green.300');
  const downstreamMsgColor = useColor('blue.300');
  const subscribeMsgColor = useColor('orange.300');

  const charts = [
    { key: 'upstream_msg', title: '上行消息 (条)', color: upstreamMsgColor },
    {
      key: 'downstream_msg',
      title: '下行消息 (条)',
      color: downstreamMsgColor,
    },
    { key: 'subscribe_num', title: '订阅消息 (条)', color: subscribeMsgColor },
  ];

  const { isLoading, items } = usePrometheusTKMeterBatchQuery({
    params: {
      ...params,
      meters: charts.map(({ key }) => key),
    },
  });

  return (
    <Box width="100%">
      <ModuleHeader
        title="消息订阅"
        description="平台消息吞吐"
        link="../message"
      />
      <HStack spacing="12px">
        {charts.map(({ key, title, color }) => {
          const data = findValues({ data: items, query: key });

          return (
            <MessageSubscriptionBox key={key} title={title}>
              <Chart data={data} isLoading={isLoading} barColor={color} />
            </MessageSubscriptionBox>
          );
        })}
      </HStack>
    </Box>
  );
}
