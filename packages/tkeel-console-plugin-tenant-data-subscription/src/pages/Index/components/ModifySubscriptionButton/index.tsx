import { useDisclosure } from '@chakra-ui/react';
// import { CreateButton } from '@tkeel/console-components';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import useModifySubscriptionMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useModifySubscriptionMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';
import ModifySubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionModal';
// import SetPasswordModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/SetPasswordModal';

type Props = {
  onSuccess: () => void;
};

export default function ModifySubscriptionButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useCreateSubscribeMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    const { title, description } = formValues;
    if (formValues) {
      mutate({
        data: {
          title,
          description,
        },
      });
    }
    return null;
  };

  // const {
  //   isOpen: isSuccessModalOpen,
  //   onOpen: onSuccessModalOpen,
  //   onClose: onSuccessModalClose,
  // } = useDisclosure();

  const { isLoading } = useModifySubscriptionMutation({
    onSuccess() {
      onSuccess();
      onClose();
      // onSuccessModalOpen();
    },
  });
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
          // console.log('test');
          onOpen();
        }}
      />
      <ModifySubscriptionModal
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
      {/* {isSuccessModalOpen && (
        <SetPasswordModal
          isOpen={isSuccessModalOpen}
          title="创建成功"
          data={setPasswordModalData}
          onClose={onSuccessModalClose}
        />
      )} */}
    </>
  );
}
