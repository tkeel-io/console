import { useDisclosure } from '@chakra-ui/react';
import { LinkButton } from '@tkeel/console-components';

import { Tenant } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';
import EditSpaceModal from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/EditSpaceModal';

interface Props {
  variant: 'link' | 'action';
  data: Tenant;
  onSuccess: () => void;
}

export default function ModifyTenantButton({
  variant,
  data,
  onSuccess,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line no-console
  console.log(data, onSuccess);

  return (
    <>
      {variant === 'link' && <LinkButton onClick={onOpen}>修改用户</LinkButton>}
      {isOpen && <EditSpaceModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
