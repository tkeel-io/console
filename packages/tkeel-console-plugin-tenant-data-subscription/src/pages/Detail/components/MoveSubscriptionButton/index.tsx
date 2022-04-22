import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useMoveSubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useMoveSubscriptionMutation';
import useListSubscribeQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
import MoveSubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/MoveSubscriptionModal';

type Props = {
  onSuccess: () => void;
  selected_ids: string[];
};

export default function MoveSubscriptionButton({
  onSuccess,
  selected_ids,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: listSubscribeData } = useListSubscribeQuery();

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
          data={listSubscribeData}
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
