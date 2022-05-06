import BaseNetworkModal, { FormValues } from '../BaseNetworkModal';

type Props = {
  networkName?: string;
  type: 'createButton' | 'createText' | 'editButton';
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateNetworkModal({
  networkName,
  type,
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseNetworkModal
      title={type === 'editButton' ? '编辑代理网关' : '创建代理网关'}
      defaultValues={{ networkName: networkName ?? '' }}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
