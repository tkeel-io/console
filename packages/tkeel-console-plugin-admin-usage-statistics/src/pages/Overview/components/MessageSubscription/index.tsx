import { Box } from '@chakra-ui/react';

import ModuleHeader from '../ModuleHeader';

export default function MessageStorage() {
  return (
    <Box width="100%">
      <ModuleHeader
        title="消息存储"
        description="平台消息存储"
        link="../message"
      />
    </Box>
  );
}
