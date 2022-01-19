import { Button, useDisclosure } from '@chakra-ui/react';
import { DownloadFilledIcon } from '@tkeel/console-icons';

import EditConfigModal from './EditConfigModal';

import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

type Props = {
  size?: string;
  pluginInfo: PluginInfo;
};

function InstallButton({ size = 'xs', pluginInfo }: Props) {
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
        pluginInfo={pluginInfo}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default InstallButton;
