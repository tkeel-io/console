import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { useSubscribeListQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import useMoveSubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useMoveSubscriptionMutation';

import MoveSubscriptionModal from '../MoveSubscriptionModal';

type Props = {
  onSuccess: () => void;
  selected_ids: string[];
};

export default function MoveSubscriptionButton({
  onSuccess,
  selected_ids,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { subscribeList } = useSubscribeListQuery({
    pageSize: Number.MAX_SAFE_INTEGER,
  });
  const { id } = useParams();
  const newSubscribeList = subscribeList.filter(
    (subscribe) => subscribe.id !== id
  );

  const toast = plugin.getPortalToast();
  const { mutate, isLoading } = useMoveSubscriptionMutation({
    onSuccess() {
      onSuccess();
      onClose();
      toast('移动订阅成功', { status: 'success' });
    },
  });

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="移动订阅"
        onClick={() => {
          onOpen();
        }}
      />
      {isOpen && (
        <MoveSubscriptionModal
          subscribeList={newSubscribeList}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={(targetId) => {
            mutate({
              data: {
                targetId,
                selectedIds: selected_ids,
              },
            });
          }}
        />
      )}
    </>
  );
}
