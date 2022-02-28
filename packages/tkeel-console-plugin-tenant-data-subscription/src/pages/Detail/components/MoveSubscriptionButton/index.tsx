import { useDisclosure } from '@chakra-ui/react';

// import { CreateButton } from '@tkeel/console-components';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import useMoveSubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useMoveSubscriptionMutation';
// import SetPasswordModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/SetPasswordModal';
import useListSubscribeQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
import MoveSubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/MoveSubscriptionModal';
// import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';

type Props = {
  onSuccess: () => void;
  selected_ids: string;
};

export default function MoveSubscriptionButton({
  onSuccess,
  selected_ids,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { mutate } = useCreateSubscribeMutation({
  //   onSuccess() {
  //     onSuccess();
  //     onClose();
  //   },
  // });

  const { data: listSubscribeData } = useListSubscribeQuery();

  const { mutate, isLoading } = useMoveSubscriptionMutation({
    onSuccess() {
      onSuccess();
      onClose();
      // onSuccessModalOpen();
    },
  });

  // const handleConfirm = (selectKey:string) => {
  // console.log("handleConfirm ~ selectKey", selectKey)

  //   mutate({});

  //   // if (formValues) {
  //   //   mutate({});
  //   // }
  //   // return null;
  // };

  // const {
  //   isOpen: isSuccessModalOpen,
  //   onOpen: onSuccessModalOpen,
  //   onClose: onSuccessModalClose,
  // } = useDisclosure();

  // const setPasswordModalData = {
  //   tenant_id: data?.tenant_id ?? '',
  //   user_id: data?.user_id ?? '',
  //   username: data?.username ?? '',
  // };

  return (
    <>
      {/* <CreateButton onClick={onOpen}>创建订阅</CreateButton> */}
      <MoreActionButton
        icon={<PencilFilledIcon />}
        title="移动订阅"
        onClick={() => {
          // console.log('test');
          onOpen();
        }}
      />
      {isOpen && (
        <MoveSubscriptionModal
          data={listSubscribeData}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={(target_id: number) => {
            mutate({
              data: {
                targetId: target_id,
                selectedIds: [selected_ids],
              },
            });
          }}
        />
      )}
    </>
  );
}
