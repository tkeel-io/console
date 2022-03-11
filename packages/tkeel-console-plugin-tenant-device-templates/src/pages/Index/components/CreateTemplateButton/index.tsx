import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { TemplateTreeNodeDataType } from '@tkeel/console-request-hooks';

import CreateTemplateModal from '../CreateTemplateModal';

type Props = {
  templateData: TemplateTreeNodeDataType[];
  onSuccess: (id: string) => void;
};

export default function CreateTemplateButton({
  onSuccess,
  templateData,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateButton onClick={onOpen}>添加模板</CreateButton>
      <CreateTemplateModal
        templateData={templateData}
        isOpen={isOpen}
        onClose={onClose}
        handleCreateSuccess={onSuccess}
      />
    </>
  );
}
