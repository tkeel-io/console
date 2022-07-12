import { useDisclosure } from '@chakra-ui/react';

import {
  CreateButton,
  LinkButton,
  MoreActionButton,
} from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useCreateNotificationMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useCreateNotificationMutation';
import useModifyNotificationMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useModifyNotificationMutation';

import { FormValues } from '../BaseNotificationModal';
import CreateNotificationModal from '../CreateNotificationModal';

interface Props {
  id?: number;
  groupName?: string;
  description?: string;
  type: 'createButton' | 'createText' | 'editButton';
  onSuccess: () => void;
}

export default function CreateNotificationButton({
  id,
  groupName,
  description,
  type,
  onSuccess,
}: Props) {
  const isEdit = type === 'editButton';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const useOperationMutation = isEdit
    ? useModifyNotificationMutation
    : useCreateNotificationMutation;
  const { isLoading, mutate } = useOperationMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });
  const handleConfirm = (formValues: FormValues) => {
    const { tenantInfo } = plugin.getPortalProps().client;
    const createData = {
      tenantId: tenantInfo.tenant_id,
      groupName: formValues?.groupName,
      noticeDesc: formValues?.description,
    };
    const editData = {
      noticeId: id ?? 0,
      groupName: formValues?.groupName,
      noticeDesc: formValues?.description,
    };
    mutate({
      data: isEdit ? editData : createData,
    });
  };

  return (
    <>
      {type === 'createButton' && (
        <CreateButton onClick={onOpen}>添加通知对象</CreateButton>
      )}
      {type === 'createText' && (
        <LinkButton onClick={onOpen} fontSize="14px" lineHeight="24px">
          创建
        </LinkButton>
      )}
      {isEdit && (
        <MoreActionButton
          icon={<PencilFilledIcon />}
          title="编辑通知对象"
          onClick={onOpen}
        />
      )}
      {isOpen && (
        <CreateNotificationModal
          groupName={groupName ?? ''}
          description={description ?? ''}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
