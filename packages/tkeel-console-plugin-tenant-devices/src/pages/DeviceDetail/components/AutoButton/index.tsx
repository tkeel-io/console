import { useDisclosure } from '@chakra-ui/react';

// import AutoMappingModal from '../AutoMappingModal';
import { AddDevicesModal } from '@tkeel/console-business-components';
import { IconButton } from '@tkeel/console-components/src/components/Button';
import { DevopsFilledIcon } from '@tkeel/console-icons';

export default function AutoMappingButton() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleConfirm = () => {};
  return (
    <>
      <IconButton
        colorScheme="primary"
        style={{ padding: '0 12px' }}
        icon={<DevopsFilledIcon size="18px" color="white" />}
        onClick={onOpen}
      >
        样例
      </IconButton>
      {/* <AutoMappingModal  /> */}
      <AddDevicesModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={false}
        onConfirm={handleConfirm}
      />
    </>
  );
}
