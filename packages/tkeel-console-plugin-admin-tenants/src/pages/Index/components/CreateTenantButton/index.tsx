import { useDisclosure } from '@chakra-ui/react';
import { CreateButton, toast } from '@tkeel/console-components';

import { FormValues } from '@/tkeel-console-plugin-admin-tenants/components/BaseTenantModal';
import useCreateTenantMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useCreateTenantMutation';
import CreateTenantModal from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/CreateTenantModal';

export default function CreateTenantButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useCreateTenantMutation({
    onSuccess: () => {
      toast({ status: 'success', title: '创建成功' });
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({ data: formValues });
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建租户空间</CreateButton>
      {isOpen && (
        <CreateTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          formFields={{}}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
