import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';

import ModuleHeader from '../ModuleHeader';
import { DEFAULT_VALUE } from './constants';
import FrequencyChart from './FrequencyChart';
import RadioGroup from './RadioGroup';
import TimeChart from './TimeChart';

const METERS = ['sum_tkapi_request_7d', 'avg_tkapi_request_latency_7d'];

export default function Api() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  usePrometheusTKMeterBatchQuery({
    params: { meters: METERS },
    isWithTenantId: false,
  });

  return (
    <Box width="100%">
      <ModuleHeader
        title="API 调用"
        description="7 日内平台插件被调用数统计"
        link="../api"
      />
      <BaseBox sx={{ display: 'flex' }}>
        <RadioGroup
          defaultValue={DEFAULT_VALUE}
          sx={{ padding: '28px 32px' }}
          onChange={(val) => setValue(val as string)}
        />
        <Box flex="1" padding="12px 16px" backgroundColor="gray.50">
          <Box height="100%" backgroundColor="white">
            {value === 'frequency' && <FrequencyChart />}
            {value === 'time' && <TimeChart />}
          </Box>
        </Box>
      </BaseBox>
    </Box>
  );
}
