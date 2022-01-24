import { MouseEventHandler } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { Editor, Modal } from '@tkeel/console-components';

import useInstallPluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useInstallPluginMutation';
import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';
import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

type Props = {
  pluginInfo: PluginInfo;
  isOpen: boolean;
  onClose: () => void;
};

function EditConfigModal({ pluginInfo, isOpen, onClose }: Props) {
  const { repo, name, version } = pluginInfo;
  const { pluginDetail, isLoading: isQueryDetailLoading } =
    usePluginDetailQuery({
      repoName: repo,
      installerName: name,
      installerVersion: version,
      enabled: isOpen,
    });

  const { mutate, isLoading: isInstallLoading } = useInstallPluginMutation({
    name,
    onSuccess: onClose,
  });

  const handleInstall: MouseEventHandler<HTMLButtonElement> = () => {
    mutate({
      data: {
        name,
        version,
        repo,
        configuration: pluginDetail?.configuration || '',
        type: 1,
      },
    });
  };

  return (
    <Modal
      title={
        <Text color="gray.800" fontSize="14px">
          设置配置
        </Text>
      }
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button
            marginLeft="12px"
            colorScheme="primary"
            disabled={isQueryDetailLoading || isInstallLoading}
            onClick={handleInstall}
          >
            确定
          </Button>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Editor
        width="100%"
        height="416px"
        language="yaml"
        value={atob(pluginDetail?.configuration || '')}
        readOnly
      />
    </Modal>
  );
}

export default EditConfigModal;
