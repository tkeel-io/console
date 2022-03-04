import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { KeyFilledIcon } from '@tkeel/console-icons';
import { jumpToAuthLoginPage } from '@tkeel/console-utils';

import useAdminModifyPasswordMutation from '@/tkeel-console-portal-admin/hooks/mutations/useAdminModifyPasswordMutation';

import ModifyPasswordModal from './ModifyPasswordModal';

const handleSuccess = () => {
  jumpToAuthLoginPage({
    portalName: 'admin',
    isRemoveLocalTokenInfo: true,
    isReplace: true,
  });
};

export default function ModifyPasswordButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen } = useDisclosure();
  const { isLoading, mutate } = useAdminModifyPasswordMutation({
    onSuccess() {
      onAlertOpen();
    },
  });

  return (
    <>
      <MoreActionButton
        title="修改密码"
        icon={<KeyFilledIcon />}
        onClick={onOpen}
      />
      {isOpen && (
        <ModifyPasswordModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={(requestData) => {
            mutate({ data: requestData });
          }}
        />
      )}
      <Alert
        isOpen={isAlertOpen}
        icon="success"
        iconPosition="left"
        title="密码修改成功，请重新登录"
        hasCancelButton={false}
        onClose={handleSuccess}
        onConfirm={handleSuccess}
      />
    </>
  );
}
