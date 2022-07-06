import { Circle, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteNotificationMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useDeleteNotificationMutation';
import useGetBindQuery from '@/tkeel-console-plugin-tenant-notification-objects/hooks/queries/useGetBindQuery';

interface Props {
  cruxData: {
    id: number;
    name: string;
  };
  refetch?: () => void;
}

function DeleteNotificationButton({ cruxData, refetch }: Props) {
  const [send, setSend] = useState(false);
  const { id, name } = cruxData;
  const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isBind } = useGetBindQuery({
    noticeId: id,
    sendRequest: send,
  });
  const { mutate, isLoading } = useDeleteNotificationMutation({
    onSuccess() {
      toast('删除成功', { status: 'success' });
      onClose();
      if (refetch) refetch();
    },
  });

  const handleConfirm = () => {
    setSend(true);
    if (isBind <= 0) {
      mutate({
        data: {
          noticeId: id,
          deleted: 1,
        },
      });
    } else {
      toast('该对象组已绑定，暂无法删除', { status: 'warning' });
    }
  };

  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon />}
        title="删除通知对象"
        onClick={onOpen}
      />
      {isOpen && (
        <Alert
          iconPosition="left"
          icon={
            <Circle size="44px" backgroundColor="red.50">
              <TrashFilledIcon size="24px" color="red.300" />
            </Circle>
          }
          title={`确认删除通知对象「${name}」？`}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default DeleteNotificationButton;
