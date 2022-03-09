import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, toast } from '@tkeel/console-components';

export default function Example() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box padding="24px">
        <Button
          onClick={() => {
            toast({ status: 'success', title: 'open toast' });
          }}
        >
          open toast
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
              toast({ status: 'success', title: 'Modal onConfirm' });
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
