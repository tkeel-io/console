import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import ModifyTenantModal, {
  FormValues,
} from '@/tkeel-console-plugin-admin-tenants/components/ModifyTenantModal';
import useModifyTenantMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useModifyTenantMutation';
import { Tenant } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

interface Props {
  data: Tenant;
  onSuccess: () => void;
}

export default function ModifyTenantButton({ data, onSuccess }: Props) {
  const defaultValues = {
    title: data?.title,
    remark: data?.remark,
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate } = useModifyTenantMutation({
    tenantId: data?.tenant_id,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({ data: formValues });
  };

  return (
    <>
      <LinkButton onClick={onOpen}>编辑</LinkButton>
      {isOpen && (
        <ModifyTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          defaultValues={defaultValues}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
