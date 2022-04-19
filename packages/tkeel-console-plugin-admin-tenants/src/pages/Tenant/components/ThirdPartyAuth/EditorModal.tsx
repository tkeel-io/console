import { useState } from 'react';

import { AceEditor, Modal } from '@tkeel/console-components';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  value?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};

export default function EditorModal({
  isOpen,
  isConfirmButtonLoading,
  value = '',
  onClose,
  onConfirm,
}: Props) {
  const [config, setConfig] = useState<string>(value);

  const handleChange = (v: string) => {
    setConfig(v);
  };

  const handleConfirm = () => {
    onConfirm(config);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="设置配置"
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <AceEditor
        value={config}
        language="yaml"
        height="584px"
        readOnly={false}
        onChange={handleChange}
      />
    </Modal>
  );
}
