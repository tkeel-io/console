import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import MoveRoutingRuleModal from '../MoveRoutingRuleModal';

type Props = {
  selectedIds: string[];
  // onSuccess: () => void;
};

export default function MoveRoutingRuleButton({
  selectedIds,
}: // onSuccess,
Props) {
  // eslint-disable-next-line no-console
  console.log('selectedIds', selectedIds);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { mutate, isLoading } = useMoveSubscriptionMutation({
  //   onSuccess() {
  //     onSuccess();
  //     onClose();
  //   },
  // });

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="移动路由"
        onClick={() => {
          onOpen();
        }}
      />
      <MoveRoutingRuleModal
        data={[{ id: '1', name: '1' }]}
        isOpen={isOpen}
        isConfirmButtonLoading={false}
        onClose={onClose}
        onConfirm={() => {
          // mutate({
          //   data: {
          //     selectedIds: selectedIds,
          //   },
          // });
        }}
      />
    </>
  );
}
