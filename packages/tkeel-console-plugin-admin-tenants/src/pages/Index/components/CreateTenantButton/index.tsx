import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import { FormValues } from '@/tkeel-console-plugin-admin-tenants/components/BaseTenantModal';
import CreateTenantModal from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/CreateTenantModal';

export default function CreateTenantButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirm = (formValues: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(formValues);
    onClose();
  };

  return (
    <>
      <CreateButton onClick={onOpen}>创建租户空间</CreateButton>
      {isOpen && (
        <CreateTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          formFields={{}}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
