import BaseProxyModal, { FormValues } from '../BaseProxyModal';

interface Props {
  proxyCruxData?: FormValues;
  type: 'createButton' | 'createText' | 'editButton';
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => void;
  onConfirm: (formValues: FormValues) => void;
}

export default function CreateProxyModal({
  proxyCruxData,
  type,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseProxyModal
      title={type === 'editButton' ? '编辑代理服务' : '创建代理服务'}
      defaultValues={proxyCruxData}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
