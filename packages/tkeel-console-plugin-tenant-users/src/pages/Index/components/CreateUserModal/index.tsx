import BaseUserModal from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function CreateUserModal({ isOpen, onClose }: Props) {
  return <BaseUserModal title="创建用户" isOpen={isOpen} onClose={onClose} />;
}
