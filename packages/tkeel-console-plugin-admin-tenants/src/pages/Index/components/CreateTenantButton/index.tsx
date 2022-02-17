import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import EditSpaceModal from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/EditSpaceModal';

export default function CreateTenantButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>创建用户</CreateButton>
      {isOpen && <EditSpaceModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
