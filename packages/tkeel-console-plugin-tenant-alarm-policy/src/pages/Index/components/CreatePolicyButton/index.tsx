import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

import CreateTenantModal from '../CreatePolicyModal';

const handleConfirm = () => {};
export default function CreatePolicyButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>添加告警策略</CreateButton>
      {isOpen && (
        <CreateTenantModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
