import { MouseEventHandler } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { Editor, Modal } from '@tkeel/console-components';

import useInstallPluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useInstallPluginMutation';
import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';
import { b64ToUTF8 } from '@/tkeel-console-plugin-admin-plugins/utils';

export interface InstallPluginInfo {
  name: string;
  version: string;
  repo: string;
  installed: boolean;
}

type Props = {
  installPluginInfo: InstallPluginInfo;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => unknown;
};

function EditConfigModal({
  installPluginInfo,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const { repo, name, version } = installPluginInfo;
  const { pluginDetail, isLoading: isQueryDetailLoading } =
    usePluginDetailQuery({
      repoName: repo,
      installerName: name,
      installerVersion: version,
      enabled: isOpen,
    });

  const { mutate, isLoading: isInstallLoading } = useInstallPluginMutation({
    name,
    onSuccess,
  });

  const handleInstall: MouseEventHandler<HTMLButtonElement> = () => {
    mutate({
      data: {
        name,
        version,
        repo,
        configuration: pluginDetail?.metadata?.configuration || '',
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
        value={b64ToUTF8(pluginDetail?.metadata?.configuration ?? '')}
        readOnly
      />
    </Modal>
  );
}

export default EditConfigModal;
