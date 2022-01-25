import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import { FormValues } from '@/tkeel-console-plugin-tenant-users/pages/Index/components/BaseUserModal';
import ModifyUserModal from '@/tkeel-console-plugin-tenant-users/pages/Index/components/ModifyUserModal';

const handleConfirm = (formValues: FormValues) => {
  // eslint-disable-next-line no-console
  console.log(formValues);
};

export default function ModifyUserButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      <ModifyUserModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
