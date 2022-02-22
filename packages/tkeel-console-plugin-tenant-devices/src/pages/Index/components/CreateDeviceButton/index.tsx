import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import CreateDeviceModal from '../CreateDeviceModal';
import { CreateType } from '../CreateDeviceModal/types';

export default function CreateDeviceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CreateButton onClick={onOpen}>添加设备</CreateButton>
      <CreateDeviceModal
        isOpen={isOpen}
        onClose={onClose}
        type={CreateType.DEVICE}
      />
    </>
  );
}
