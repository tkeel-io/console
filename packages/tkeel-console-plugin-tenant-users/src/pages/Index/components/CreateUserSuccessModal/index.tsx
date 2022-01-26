import { Alert } from '@tkeel/console-components';

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
};

export default function CreateUserSuccessModal({ isOpen, onClose }: Props) {
  return (
    <Alert
      icon="success"
      title="创建成功"
      description="复制下方链接，邀请您的同事开始使用 tKeel"
      isOpen={isOpen}
      onClose={onClose}
    >
      123
    </Alert>
  );
}
