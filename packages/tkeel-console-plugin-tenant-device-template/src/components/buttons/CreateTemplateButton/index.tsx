import { useDisclosure } from '@chakra-ui/react';
import { CreateButton } from '@tkeel/console-components';

import { CreateTemplateModal } from '@/tkeel-console-plugin-tenant-device-template/components/modals';

type Props = {
  onSuccess: () => void;
};

export default function CreateTemplateButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>添加模板</CreateButton>
      {isOpen && (
        <CreateTemplateModal
          isOpen={isOpen}
          onClose={onClose}
          handleCreateSuccess={onSuccess}
        />
      )}
    </>
  );
}
