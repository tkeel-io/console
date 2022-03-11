import { Box, Button } from '@chakra-ui/react';

import { plugin } from '@tkeel/console-utils';

export default function Example() {
  return (
    <Box padding="24px">
      <Button
        onClick={() => {
          const toast = plugin.getPortalToast();
          toast('toast', { status: 'default' });
          toast('toast', { status: 'success' });
          toast('toast', { status: 'error' });
          toast('toast', { status: 'info' });
          toast('toast', { status: 'warning' });
        }}
      >
        toast
      </Button>
    </Box>
  );
}
