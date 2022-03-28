import { Box, Tooltip, useDisclosure } from '@chakra-ui/react';

import { Alert, IconButton } from '@tkeel/console-components';
import { DownloadFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import EditConfigModal, { InstallPluginInfo } from './EditConfigModal';

interface Props {
  installPluginInfo: InstallPluginInfo;
  onSuccess: () => unknown;
}

function InstallButton({ installPluginInfo, onSuccess }: Props) {
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  return (
    <Box flexShrink={0}>
      <Tooltip hasArrow shouldWrapChildren placement="top">
        <IconButton
          size="sm"
          padding="0 12px"
          boxShadow="none"
          borderRadius="4px"
          icon={<DownloadFilledIcon size={12} />}
          onClick={(e) => {
            e.stopPropagation();
            if (installPluginInfo.state === 'SAME_NAME') {
              onAlertOpen();
            } else {
              onOpen();
            }
          }}
        >
          安装
        </IconButton>
      </Tooltip>
      <EditConfigModal
        installPluginInfo={installPluginInfo}
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={() => {
          onClose();
          onSuccess();
          toast('安装插件成功', { status: 'success' });
        }}
      />
      <Alert
        icon="warning"
        iconPosition="left"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={() => {
          onAlertClose();
          onOpen();
        }}
        title="已安装其他版本的同名插件，是否继续安装并覆盖？"
      />
    </Box>
  );
}

export default InstallButton;
