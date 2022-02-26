import { useDisclosure } from '@chakra-ui/react';

import { IconButton, toast } from '@tkeel/console-components';
import { DownloadFilledIcon } from '@tkeel/console-icons';

import EditConfigModal, { InstallPluginInfo } from './EditConfigModal';

interface Props {
  installPluginInfo: InstallPluginInfo;
  onSuccess: () => unknown;
}

function InstallButton({ installPluginInfo, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        size="sm"
        padding="0 12px"
        boxShadow="none"
        borderRadius="4px"
        icon={<DownloadFilledIcon size={12} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        安装
      </IconButton>
      <EditConfigModal
        installPluginInfo={installPluginInfo}
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={() => {
          onClose();
          onSuccess();
          toast({ status: 'success', title: '安装插件成功' });
        }}
      />
    </>
  );
}

export default InstallButton;
