import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import { Alert } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

export default function Example() {
  const {
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  return (
    <Flex>
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
            toast.warning('warning');
            toast.error({
              status: 'error',
              title: 'error',
              description: 'error description',
            });
          }}
        >
          toast
        </Button>
      </Box>
      <Box padding="24px">
        <Button onClick={onInfoOpen}>Info Alert</Button>
        <Alert
          isOpen={isInfoOpen}
          icon="info"
          title="info"
          onClose={onInfoClose}
        />
      </Box>
      <Box padding="24px">
        <Button onClick={onSuccessOpen}>Success Alert</Button>
        <Alert
          isOpen={isSuccessOpen}
          icon="success"
          title="success"
          onClose={onSuccessClose}
        />
      </Box>
      <Box padding="24px">
        <Button onClick={onWarningOpen}>Warning Alert</Button>
        <Alert
          isOpen={isWarningOpen}
          icon="warning"
          title="warning"
          onClose={onWarningClose}
        />
      </Box>
      <Box padding="24px">
        <Button onClick={onErrorOpen}>Error Alert</Button>
        <Alert
          isOpen={isErrorOpen}
          icon="error"
          title="error"
          onClose={onErrorClose}
        />
      </Box>
    </Flex>
  );
}
