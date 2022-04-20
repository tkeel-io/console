import { useDisclosure } from '@chakra-ui/react';

import { IconButton } from '@tkeel/console-components/src/components/Button';
import { DevopsFilledIcon } from '@tkeel/console-icons';

import AutoMappingModal from '../AutoMappingModal';

export default function AutoMappingButton() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <IconButton
        colorScheme="primary"
        style={{ padding: '0 12px' }}
        icon={<DevopsFilledIcon size="18px" color="white" />}
        onClick={onOpen}
      >
        自动映射
      </IconButton>
      <AutoMappingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
