import { Box, Button } from '@chakra-ui/react';

import { plugin } from '@tkeel/console-utils';

export default function Example() {
  return (
    <Box padding="24px">
      <Button
        onClick={() => {
          const toast = plugin.getPortalToast();
          toast('123', {
            type: 'success',
          });
        }}
      >
        open toast
      </Button>
    </Box>
  );
}
