import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

import CreateTemplateModal from '../CreateTemplateModal';

type Props = {
  onSuccess: () => void;
};

export default function CreateTemplateButton({ onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>添加模板</CreateButton>
      <CreateTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        handleCreateSuccess={onSuccess}
      />
    </>
  );
}
