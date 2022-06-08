import { Box, HStack } from '@chakra-ui/react';
import * as dayjs from 'dayjs';

import { useColor } from '@tkeel/console-hooks';
import { getTimestamp } from '@tkeel/console-utils';

import usePrometheusTKMeterQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterQuery';

import ModuleHeader from '../ModuleHeader';
import Chart from './Chart';
import MessageSubscriptionBox from './MessageSubscriptionBox';

const et = getTimestamp();
const st = dayjs(et).subtract(6, 'day').startOf('day').valueOf();
const step = '24h';

export default function MessageSubscription() {
  const params = { et, st, step };

  const { item } = usePrometheusTKMeterQuery({
    params: { ...params, meter: 'upstream_msg' },
  });

  const color = useColor('green.300');

  return (
    <Box width="100%">
      <ModuleHeader
        title="消息订阅"
        description="平台消息吞吐"
        link="../message"
      />
      <HStack spacing="12px">
        <MessageSubscriptionBox title="上行消息 (条)">
          <Chart data={item?.result[0].values ?? []} barColor={color} />
        </MessageSubscriptionBox>
        <MessageSubscriptionBox title="下行消息 (条)">
          15
        </MessageSubscriptionBox>
        <MessageSubscriptionBox title="订阅消息 (条)">
          16
        </MessageSubscriptionBox>
      </HStack>
    </Box>
  );
}
