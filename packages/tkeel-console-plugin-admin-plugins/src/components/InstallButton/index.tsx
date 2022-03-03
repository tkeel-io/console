import { Box, Tooltip, useDisclosure } from '@chakra-ui/react';

import { IconButton, toast } from '@tkeel/console-components';
import { DownloadFilledIcon } from '@tkeel/console-icons';

import EditConfigModal, { InstallPluginInfo } from './EditConfigModal';

interface Props {
  installPluginInfo: InstallPluginInfo;
  disabled: boolean;
  onSuccess: () => unknown;
}

function InstallButton({ installPluginInfo, disabled, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box flexShrink="0">
      <Tooltip
        hasArrow
        label={disabled ? '已存在同名插件，不可重复安装' : ''}
        shouldWrapChildren
        placement="top"
      >
        <IconButton
          size="sm"
          padding="0 12px"
          boxShadow="none"
          borderRadius="4px"
          icon={<DownloadFilledIcon size={12} />}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
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
          toast({ status: 'success', title: '安装插件成功' });
        }}
      />
    </Box>
  );
}

export default InstallButton;
