import { Box } from '@chakra-ui/react';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';

import ModuleHeader from '../ModuleHeader';
import RadioGroup from './RadioGroup';

export default function Api() {
  return (
    <Box width="100%">
      <ModuleHeader
        title="API 调用"
        description="7 日内平台插件被调用数统计"
        link="../api"
      />
      <BaseBox sx={{ display: 'flex' }}>
        <RadioGroup sx={{ padding: '28px 32px' }} />
        <Box flex="1" padding="12px 16px" backgroundColor="gray.50">
          <Box height="100%" backgroundColor="white">
            1
          </Box>
        </Box>
      </BaseBox>
    </Box>
  );
}
