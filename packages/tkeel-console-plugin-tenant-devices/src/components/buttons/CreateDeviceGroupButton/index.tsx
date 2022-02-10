import { Button, useDisclosure } from '@chakra-ui/react';
import { AddFilledIcon } from '@tkeel/console-icons';

import CreateDeviceModal from '@/tkeel-console-plugin-tenant-devices/components/modals/CreateDeviceModal';

export default function CreateDeviceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        h="32px"
        fontSize="12px"
        leftIcon={<AddFilledIcon color="grayAlternatives.300" />}
        onClick={onOpen}
        variant="outline"
        colorScheme="gray"
        borderRadius="4px"
        w="100%"
        color="grayAlternatives.300"
      >
        添加组
      </Button>
      <CreateDeviceModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
