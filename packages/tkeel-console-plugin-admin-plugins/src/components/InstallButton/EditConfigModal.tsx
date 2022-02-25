import { MouseEventHandler } from 'react';
import { Text } from '@chakra-ui/react';
import { Editor, Modal } from '@tkeel/console-components';
import { Base64 } from 'js-base64';

import useInstallPluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useInstallPluginMutation';
import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';

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
      isOpen={isOpen}
      isConfirmButtonDisabled={isQueryDetailLoading}
      isConfirmButtonLoading={isInstallLoading}
      onClose={onClose}
      onConfirm={handleInstall}
    >
      <Editor
        width="100%"
        height="416px"
        language="yaml"
        value={Base64.decode(pluginDetail?.metadata?.configuration ?? '')}
        readOnly
      />
    </Modal>
  );
}

export default EditConfigModal;
