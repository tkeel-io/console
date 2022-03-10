import { Box, Button } from '@chakra-ui/react';

import { plugin } from '@tkeel/console-utils';

export default function Example() {
  return (
    <>
      <Box padding="24px">
        <Button
          onClick={() => {
            const toast = plugin.getPortalToast();
            toast('toast', {
              type: 'success',
            });
          }}
        >
          open toast
        </Button>
      </Box>
      <Box padding="24px">
        <Button
          onClick={() => {
            const toast = plugin.getPortalToast();
            toast.success('toast.success');
          }}
        >
          open toast
        </Button>
      </Box>
    </>
  );
}
