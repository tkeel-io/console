import { useDisclosure } from '@chakra-ui/react';
import { LinkButton, MoreActionButton } from '@tkeel/console-components';
import { NotePencilFilledIcon } from '@tkeel/console-icons';

import ModifyTenantModal, {
  FormValues,
} from '@/tkeel-console-plugin-admin-tenants/components/ModifyTenantModal';
import useModifyTenantMutation from '@/tkeel-console-plugin-admin-tenants/hooks/mutations/useModifyTenantMutation';

interface Props {
  variant: 'link' | 'menu';
  data: {
    tenant_id: string;
    title: string;
    remark?: string;
  };
  onSuccess: () => void;
}

export default function ModifyTenantButton({
  variant,
  data,
  onSuccess,
}: Props) {
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
      {variant === 'link' && <LinkButton onClick={onOpen}>编辑</LinkButton>}
      {variant === 'menu' && (
        <MoreActionButton
          icon={<NotePencilFilledIcon />}
          title="编辑租户空间"
          onClick={onOpen}
        />
      )}
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
