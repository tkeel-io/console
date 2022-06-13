import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';
import usePrometheusTKMeterBatchQuery from '@/tkeel-console-plugin-admin-usage-statistics/hooks/queries/usePrometheusTKMeterBatchQuery';
import { findValueInResults } from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

import ModuleHeader from '../ModuleHeader';
import { DEFAULT_VALUE, OPTIONS } from './constants';
import FrequencyChart from './FrequencyChart';
import RadioGroup from './RadioGroup';
import TimeChart from './TimeChart';

const METERS = OPTIONS.map(({ value }) => value);

export default function Api() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const { isLoading, results } = usePrometheusTKMeterBatchQuery({
    params: { meters: METERS },
  });
  const options = OPTIONS.map((option) => {
    const { value: query } = option;
    const content = findValueInResults({
      data: results,
      query,
      defaults: 0,
    });

    return { ...option, content };
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
          options={options}
          defaultValue={DEFAULT_VALUE}
          isLoading={isLoading}
          sx={{ padding: '28px 32px' }}
          onChange={(val) => setValue(val as string)}
        />
        <Box flex="1" padding="12px 16px" backgroundColor="gray.50">
          <Box height="184px" padding="16px 16px 0" backgroundColor="white">
            {value === 'sum_tkapi_request_7d' && <FrequencyChart />}
            {value === 'avg_tkapi_request_latency_7d' && <TimeChart />}
          </Box>
        </Box>
      </BaseBox>
    </Box>
  );
}
