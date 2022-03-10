import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { KeyFilledIcon } from '@tkeel/console-icons';
import { jumpToAuthLoginPage } from '@tkeel/console-utils';

import useModifyPasswordMutation from '@/tkeel-console-portal-tenant/hooks/mutations/useModifyPasswordMutation';

import ModifyPasswordModal from './ModifyPasswordModal';

export default function ModifyPasswordButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen } = useDisclosure();
  const { isLoading, mutate, data } = useModifyPasswordMutation({
    onSuccess() {
      onAlertOpen();
    },
  });

  const handleSuccess = () => {
    const tenantId = data?.tenant_id ?? '';
    jumpToAuthLoginPage({
      portalName: 'tenant',
      tenantId,
      isRemoveLocalTokenInfo: true,
      isReplace: true,
    });
  };

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
