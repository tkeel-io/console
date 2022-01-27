import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/BaseRoleModal';
import ModifyRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/ModifyRoleModal';

const handleConfirm = (formValues: FormValues) => {
  // eslint-disable-next-line no-console
  console.log(formValues);
};

export default function ModifyRoleButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      {isOpen && (
        <ModifyRoleModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
