import { Text } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { MouseEventHandler, useState } from 'react';

import { AceEditor, Modal } from '@tkeel/console-components';

import useInstallPluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useInstallPluginMutation';
import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';
import { PluginState } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

export interface InstallPluginInfo {
  name: string;
  version: string;
  repo: string;
  state: PluginState;
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
  const [configuration, setConfiguration] = useState('');
  const { repo, name, version, state } = installPluginInfo;
  const { isLoading: isQueryDetailLoading } = usePluginDetailQuery({
    repoName: repo,
    installerName: name,
    installerVersion: version,
    enabled: isOpen,
    onSuccess(data) {
      setConfiguration(data?.data?.installer?.metadata?.configuration ?? '');
    },
  });

  const { mutate, isLoading: isInstallLoading } = useInstallPluginMutation({
    name,
    method: state === 'SAME_NAME' ? 'PUT' : 'POST',
    onSuccess,
  });

  const handleInstall: MouseEventHandler<HTMLButtonElement> = () => {
    mutate({
      data: {
        name,
        version,
        repo,
        configuration,
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
      <AceEditor
        height="426px"
        language="yaml"
        readOnly={false}
        value={Base64.decode(configuration)}
        onChange={(value) => {
          setConfiguration(Base64.encode(value));
        }}
      />
    </Modal>
  );
}

export default EditConfigModal;
