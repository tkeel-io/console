import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import { FormValues } from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/BaseRoleModal';
import ModifyRoleModal from '@/tkeel-console-plugin-tenant-roles/pages/Index/components/ModifyRoleModal';

type Props = {
  data: {
    role: string;
    plugins: string[];
  };
};

const handleConfirm = (formValues: FormValues) => {
  // eslint-disable-next-line no-console
  console.log(formValues);
};

export default function ModifyRoleButton({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formFields = {
    role: {
      disabled: true,
    },
  };

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      {isOpen && (
        <ModifyRoleModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          formFields={formFields}
          defaultValues={data}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
