import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import { Tenant } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';
import ModifyTenantModal from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/ModifyTenantModal';

interface Props {
  data: Tenant;
  onSuccess: () => void;
}

export default function ModifyTenantButton({ data, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line no-console
  console.log(data, onSuccess);

  return (
    <>
      <LinkButton onClick={onOpen}>修改</LinkButton>
      {isOpen && (
        <ModifyTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          formFields={{}}
          defaultValues={{ title: '', admin: { username: '' } }}
          onClose={onClose}
          onConfirm={() => {}}
        />
      )}
    </>
  );
}
