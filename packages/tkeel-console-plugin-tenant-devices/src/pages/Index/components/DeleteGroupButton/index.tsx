/* eslint-disable no-console */
import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton, toast } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

import CustomModal from '@/tkeel-console-plugin-tenant-devices/components/CustomModal';
import useDeleteGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useDeleteGroupMutation';

interface Props {
  id: string;
  groupName: string;
  callback?: () => void;
}

function DeleteGroupButton({ id, groupName, callback }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ids = [id];
  const { mutate, isLoading } = useDeleteGroupMutation({
    ids,
    onSuccess() {
      onClose();
      toast({ status: 'success', title: '删除设备组成功' });
      if (callback) {
        window.setTimeout(() => {
          callback();
        }, 300);
      }
    },
  });
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除设备组"
        onClick={onOpen}
      />
      {isOpen && (
        <CustomModal
          bg="red.50"
          icon={<TrashFilledIcon size="24px" color="red.300" />}
          title={`确认删除设备「${groupName}」？`}
          isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={() => {
            mutate({});
          }}
        />
      )}
    </>
  );
}

export default DeleteGroupButton;
