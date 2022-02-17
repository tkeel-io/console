import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import CreateTenantModal from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/CreateTenantModal';

export default function CreateTenantButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>创建</CreateButton>
      {isOpen && (
        <CreateTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          formFields={{}}
          onClose={onClose}
          onConfirm={() => {}}
        />
      )}
    </>
  );
}
