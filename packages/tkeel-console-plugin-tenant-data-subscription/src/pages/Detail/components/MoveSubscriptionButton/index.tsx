import { useDisclosure } from '@chakra-ui/react';
// import { CreateButton } from '@tkeel/console-components';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import useModifySubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useModifySubscriptionMutation';
// import SetPasswordModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/SetPasswordModal';
import useListSubscribeQuery, {
  Data,
} from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
import MoveSubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/MoveSubscriptionModal';
// import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';

type Props = {
  onSuccess: () => void;
  data?: Data;
};

export default function MoveSubscriptionButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { mutate } = useCreateSubscribeMutation({
  //   onSuccess() {
  //     onSuccess();
  //     onClose();
  //   },
  // });

  const { data: listSubscribeData } = useListSubscribeQuery();

  const { mutate, isLoading } = useModifySubscriptionMutation({
    id: data?.id || '0',
    onSuccess() {
      onSuccess();
      // onClose();
      // onSuccessModalOpen();
    },
  });

  const handleConfirm = () => {
    mutate({});

    // if (formValues) {
    //   mutate({});
    // }
    // return null;
  };

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
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
