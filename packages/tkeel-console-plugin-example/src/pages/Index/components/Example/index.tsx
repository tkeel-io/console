import { Box, Button } from '@chakra-ui/react';

import { plugin } from '@tkeel/console-utils';

export default function Example() {
  return (
    <Box padding="24px">
      <Button
        onClick={() => {
          const toast = plugin.getPortalToast();
          toast('default');
          toast('info', { status: 'info' });
          toast({
            status: 'success',
            title: 'succuss',
            description: 'succuss description',
          });
          /* toast.warning('warning');
          toast.error({
            status: 'error',
            title: 'error',
            description: 'error description',
          }); */
        }}
      >
        toast
      </Button>
    </Box>
  );
}
