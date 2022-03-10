import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, toast } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

export default function Example() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box padding="24px">
        <Button
          onClick={() => {
            toast({
              status: 'success',
              title: '2',
              containerId: 2,
              autoClose: false,
            });
          }}
        >
          open toast 2
        </Button>
      </Box>
      <Box padding="24px">
        <Button
          onClick={() => {
            plugin.getGlobalPluginProps().portalProps.client.toast({
              status: 'success',
              title: '3',
              autoClose: false,
            });
          }}
        >
          open toast 3
        </Button>
      </Box>
      <Box padding="24px">
        <Button onClick={onOpen}>open Modal</Button>
      </Box>
      {isOpen && (
        <Modal
          title="添加设备"
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              onClose();
            }, 500);
          }}
        >
          1
        </Modal>
      )}
    </>
  );
}
