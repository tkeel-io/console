import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { Alert, MoreActionButton } from '@tkeel/console-components';
import { KeyFilledIcon } from '@tkeel/console-icons';

import useOAuthModifyPasswordMutation from '@/tkeel-console-portal-base/hooks/mutations/useOAuthModifyPasswordMutation';

import ModifyPasswordModal from './ModifyPasswordModal';

export default function ModifyPasswordButton() {
  const { isOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen } = useDisclosure();
  const navigate = useNavigate();
  const { isLoading, mutate } = useOAuthModifyPasswordMutation({
    onSuccess() {},
  });

  const navigateToLoginPage = () => {
    navigate(`/auth/login`, { replace: true });
  };

  return (
    <>
      <MoreActionButton
        title="修改密码"
        icon={<KeyFilledIcon />}
        onClick={() => {}}
      />
      <ModifyPasswordModal
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={(requestData) => {
          mutate({ data: requestData });
        }}
      />
      <Alert
        isOpen={isAlertOpen}
        icon="success"
        iconPosition="left"
        title="密码修改成功，请重新登录"
        hasCancelButton={false}
        onClose={navigateToLoginPage}
        onConfirm={navigateToLoginPage}
      />
    </>
  );
}
