import BaseUserModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

export default function CreateUserModal({ isOpen, onClose, onConfirm }: Props) {
  return (
    <BaseUserModal
      title="创建用户"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
