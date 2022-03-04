import { useDisclosure } from '@chakra-ui/react';

// import { CreateButton } from '@tkeel/console-components';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

// import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import useModifySubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useModifySubscriptionMutation';
// import SetPasswordModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/SetPasswordModal';
import { Data } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';
import ModifySubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionModal';

type Props = {
  onSuccess: () => void;
  data?: Data;
};

export default function ModifySubscriptionButton({ onSuccess, data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { mutate } = useCreateSubscribeMutation({
  //   onSuccess() {
  //     onSuccess();
  //     onClose();
  //   },
  // });

  const { mutate, isLoading } = useModifySubscriptionMutation({
    id: data?.id || '0',
    onSuccess() {
      onSuccess();
      onClose();
      // onSuccessModalOpen();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    if (formValues) {
      mutate({
        data: { ...formValues, id: Number(data?.id) || 0 },
      });
    }
    return null;
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
        title="编辑信息"
        onClick={() => {
          onOpen();
        }}
      />
      <ModifySubscriptionModal
        data={data}
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
