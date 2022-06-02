import { Box } from '@chakra-ui/react';

import ModuleHeader from '../ModuleHeader';

export default function Api() {
  return (
    <Box width="100%">
      <ModuleHeader
        title="API 调用"
        description="7 日内平台插件被调用数统计"
        link="../api"
      />
    </Box>
  );
}
