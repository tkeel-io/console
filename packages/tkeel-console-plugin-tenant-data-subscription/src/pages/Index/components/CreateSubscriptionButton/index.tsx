import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import useCreateSubscribeMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/mutations/useCreateSubscribeMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/BaseSubscriptionModal';
import CreateSubscriptionModal from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/CreateSubscriptionModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateUserButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading } = useCreateSubscribeMutation({
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

  return (
    <>
      <CreateButton onClick={onOpen}>创建订阅</CreateButton>
      <CreateSubscriptionModal
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
