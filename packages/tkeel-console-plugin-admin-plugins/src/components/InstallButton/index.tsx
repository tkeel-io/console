import { Button, useDisclosure } from '@chakra-ui/react';
import { DownloadFilledIcon } from '@tkeel/console-icons';

import EditConfigModal, { InstallPluginInfo } from './EditConfigModal';

interface Props {
  size?: string;
  installPluginInfo: InstallPluginInfo;
}

function InstallButton({ size = 'xs', installPluginInfo }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="primary"
        variant="solid-no-shadow"
        size={size}
        leftIcon={<DownloadFilledIcon size={12} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        安装
      </Button>
      <EditConfigModal
        installPluginInfo={installPluginInfo}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default InstallButton;
