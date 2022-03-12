import { Box, Button } from '@chakra-ui/react';

import { plugin } from '@tkeel/console-utils';

export default function Example() {
  return (
    <Box padding="24px">
      <Button
        onClick={() => {
          const toast = plugin.getPortalToast();
          toast('default', { status: 'default' });
          toast('success', { status: 'success' });
          toast('error', { status: 'error' });
          toast('info', { status: 'info' });
          toast('warning', { status: 'warning' });
        }}
      >
        toast
      </Button>
    </Box>
  );
}
